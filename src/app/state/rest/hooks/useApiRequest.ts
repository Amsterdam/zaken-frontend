import axios, { AxiosError } from "axios"
import { useCallback, useEffect, useContext } from "react"

import { ApiContext } from "../provider/ApiProvider"
import { ApiGroup } from "../index"

type GetOptions = {
  method: "get"
}

type MutateOptions = {
  method: "post" | "put" | "patch" | "delete"
  skipCacheClear?: boolean
  useResponseAsCache?: boolean
}

const isGetOptions = (options: any): options is GetOptions =>
  options.method === "get"

const isMutateOptions = (options: any): options is MutateOptions =>
  ["post", "put", "patch", "delete"].includes(options.method)

type Config = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  url: string
  groupName: ApiGroup
  handleError?: ( error: AxiosError ) => void
  getHeaders?: () => Record<string, string>
}

const useApiRequest = <Schema, Payload = Partial<Schema>>({ url, groupName, handleError, getHeaders, lazy, keepUsingInvalidCache }: Config) => {
  const {
    getCacheItem,
    setCacheItem,
    updateCacheItem,
    clearCache,
    pushRequestInQueue,
    isRequestPendingInQueue
  } = useContext(ApiContext)[groupName]

  /**
   * Executes an API request
   */
  const execRequest = useCallback(async (options: GetOptions | MutateOptions, payload?: Payload) => {
    try {
      if (isMutateOptions(options) && !options.skipCacheClear) {
        clearCache()
      }

      const response = await axios.request<Schema>({
        headers: getHeaders ? getHeaders() : undefined,
        method: options.method,
        url,
        data: payload
      })

      if (isGetOptions(options) || (isMutateOptions(options) && options.useResponseAsCache)) {
        setCacheItem(url, response.data)
      }

      return response
    } catch(error) {
      if (handleError) {
        handleError(error)
      } else {
        throw error
      }
    }
  }, [clearCache, setCacheItem, url, handleError, getHeaders])

  /**
   * Queues an API request
   */
  const queueRequest = useCallback(async (options: GetOptions | MutateOptions, payload?: Payload) => new Promise(
    (resolve, reject) =>
      pushRequestInQueue(url, options.method, () => execRequest(options, payload)
        .then(resolve)
        .catch(reject)
      )
  ), [ execRequest, url, pushRequestInQueue ])

  /**
   * Define HTTP methods
   */
  const execGet = useCallback((options?: Omit<GetOptions, "method">) =>
    queueRequest({ method: "get", ...options }), [ queueRequest ])

  const execPost = useCallback((payload: Payload, options?: Omit<MutateOptions, "method">) =>
    queueRequest({ method: "post", ...options }, payload), [ queueRequest ])

  const execPut = useCallback((payload: Payload, options?: Omit<MutateOptions, "method">) =>
    queueRequest({ method: "put", ...options }, payload), [ queueRequest ])

  const execPatch = useCallback((payload: Payload, options?: Omit<MutateOptions, "method">) =>
    queueRequest({ method: "patch", ...options }, payload), [ queueRequest ])

  const execDelete = useCallback((options?: Omit<MutateOptions, "method">) =>
    queueRequest({ method: "delete", ...options }), [ queueRequest ])

  const updateCache = useCallback(
    (updater: (item: Schema) => void) => updateCacheItem(url, updater),
    [ updateCacheItem, url ]
  )

  // reFetch whenever our cache is invalidated
  const cacheItem = getCacheItem(url)

  const data = cacheItem && (cacheItem.valid || keepUsingInvalidCache)
    ? cacheItem.value as Schema
    : undefined

  useEffect(() => {
    if ((!cacheItem || !cacheItem.valid) && !lazy) {
      execGet()
    }
  }, [ execGet, cacheItem, lazy ])

  return {
    data,
    isBusy: isRequestPendingInQueue(url, "get"),
    execGet,
    execPost,
    execPut,
    execPatch,
    execDelete,
    updateCache
  }
}


export default useApiRequest
