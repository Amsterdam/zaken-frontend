import { useCallback, useEffect, useContext } from "react"

import { ApiContext } from "../provider/ApiProvider"
import { type ApiGroup } from "../index"
import useRequestWrapper, { type RequestError } from "./useRequestWrapper"

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

      const response: any = await request<Schema>(options.method, url, payload) // TODO any used to be unknown

      if (isGetOptions(options) || (isMutateOptions(options) && options.useResponseAsCache)) {
        setCacheItem(url, response?.data)
      }

      return response
    } catch (error) {
      addErrorToCacheItem(url, error)
      if (handleError != null) {
        handleError(error as RequestError)
      } else {
        throw error
      }
    }
  }, [request, url, clearCache, setCacheItem, handleError, addErrorToCacheItem])

  /**
   * Queues an API request
   */
  const queueRequest = useCallback(async (options: Options, payload?: Payload) => await new Promise(
    (resolve, reject) => {
      pushRequestInQueue(url, options.method, async () => {
        await execRequest(options, payload)
          .then(resolve)
          .catch(reject)
      }
      )
    }
  ), [execRequest, url, pushRequestInQueue])

  /**
   * Define HTTP methods
   */
  const execGet = useCallback(async (options?: Omit<GetOptions, "method">) =>
    await queueRequest({ method: "get", ...options }), [queueRequest])

  const execPost = useCallback(async (payload?: Payload, options?: Omit<MutateOptions, "method">) =>
    await queueRequest({ method: "post", ...options }, payload), [queueRequest])

  const execPut = useCallback(async (payload?: Payload, options?: Omit<MutateOptions, "method">) =>
    await queueRequest({ method: "put", ...options }, payload), [queueRequest])

  const execPatch = useCallback(async (payload?: Payload, options?: Omit<MutateOptions, "method">) =>
    await queueRequest({ method: "patch", ...options }, payload), [queueRequest])

  const execDelete = useCallback(async (options?: Omit<MutateOptions, "method">) =>
    await queueRequest({ method: "delete", ...options }), [queueRequest])

  const updateCache = useCallback(
    (updater: (item: Schema) => void) => { updateCacheItem(url, updater) },
    [updateCacheItem, url]
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
  }, [execGet, cacheItem, lazy])

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
