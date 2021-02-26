import { useCallback, useEffect, useContext } from "react"

import { ApiContext } from "../provider/ApiProvider"
import { ApiGroup } from "../index"
import useRequestWrapper, { RequestError } from "./useRequestWrapper"

type GetOptions = {
  method: "get"
}

type MutateOptions = {
  method: "post" | "put" | "patch" | "delete"
  skipCacheClear?: boolean
  useResponseAsCache?: boolean
}

type Options = GetOptions | MutateOptions

const isGetOptions = (options: Options): options is GetOptions =>
  options.method === "get"

const isMutateOptions = (options: Options): options is MutateOptions =>
  ["post", "put", "patch", "delete"].includes(options.method)

type Config = {
  url: string
  groupName: ApiGroup
  isProtected?: boolean
  isMocked?: boolean
  isMockExtended?: boolean
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  handleError?: (error: RequestError) => void
}

const useApiRequest = <Schema, Payload = Partial<Schema>>({ url, groupName, handleError, isProtected, lazy, keepUsingInvalidCache, isMocked = false, isMockExtended = false }: Config) => {
  const {
    getCacheItem,
    setCacheItem,
    updateCacheItem,
    addErrorToCacheItem,
    clearCache,
    pushRequestInQueue,
    isRequestPendingInQueue
  } = useContext(ApiContext)[groupName]

  const request = useRequestWrapper(isProtected, isMocked, isMockExtended)

  /**
   * Executes an API request
   */
  const execRequest = useCallback(async (options: Options, payload?: Payload) => {
    try {
      if (isMutateOptions(options) && !options.skipCacheClear) {
        clearCache()
      }

      const response = await request<Schema>(options.method, url, payload)

      if (isGetOptions(options) || (isMutateOptions(options) && options.useResponseAsCache)) {
        setCacheItem(url, response.data)
      }

      return response
    } catch (error) {
      addErrorToCacheItem(url, error)
      if (handleError) {
        handleError(error)
      } else {
        throw error
      }
    }
  }, [request, url, clearCache, setCacheItem, handleError, addErrorToCacheItem])

  /**
   * Queues an API request
   */
  const queueRequest = useCallback(async (options: Options, payload?: Payload) => new Promise(
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

  const execPost = useCallback((payload?: Payload, options?: Omit<MutateOptions, "method">) =>
    queueRequest({ method: "post", ...options }, payload), [ queueRequest ])

  const execPut = useCallback((payload?: Payload, options?: Omit<MutateOptions, "method">) =>
    queueRequest({ method: "put", ...options }, payload), [ queueRequest ])

  const execPatch = useCallback((payload?: Payload, options?: Omit<MutateOptions, "method">) =>
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

  const errors = cacheItem?.errors ?? []

  useEffect(() => {
    if ((!cacheItem || !cacheItem.valid) && !lazy) {
      execGet()
    }
  }, [ execGet, cacheItem, lazy ])

  return [
    data,
    {
      isBusy: isRequestPendingInQueue(url, "get"),
      hasErrors: errors.length > 0,
      execGet,
      execPost,
      execPut,
      execPatch,
      execDelete,
      updateCache
    },
    errors
  ] as const
}

export default useApiRequest
