import axios, { AxiosError, Method } from "axios"
import { useCallback, useEffect, useContext } from "react"

import { ApiContext } from "../provider/ApiProvider"
import { ApiGroup } from "../index"

type Config = {
  url: string
  groupName: ApiGroup
  handleError?: ( error: AxiosError ) => void
  getHeaders?: () => Record<string, string>
}

type Callback = () => void

const useApiRequest = <Schema, Payload = Partial<Schema>>({ url, groupName, handleError, getHeaders }: Config) => {
  const {
    getCacheItem,
    setCacheItem,
    clearCache,
    pushRequestInQueue,
    isRequestPendingInQueue
  } = useContext(ApiContext)[groupName]

  /**
   * Executes an API request
   */
  const execRequest = useCallback(async (method: Method, payload?: Payload, onSuccess?: Callback) => {
    try {
      const response = await axios.request<Schema>({
        headers: getHeaders ? getHeaders() : undefined,
        method,
        url,
        data: payload
      })

      if (method !== "get") {
        clearCache()
      } else {
        setCacheItem(url, response.data)
      }
      if (onSuccess) {
        onSuccess()
      }
    } catch(error) {
      if (handleError) {
        handleError(error)
      }
    }
  }, [clearCache, setCacheItem, url, handleError, getHeaders])

  /**
   * Queues an API request
   */
  const queueRequest = useCallback(async (method: Method, payload?: Payload, onSuccess?: Callback) =>
    pushRequestInQueue(url, method, () => execRequest(method, payload, onSuccess))
  , [ execRequest, url, pushRequestInQueue ])

  /**
   * Define HTTP methods
   */
  const execGet = useCallback((onSuccess?: Callback) => queueRequest("get", undefined, onSuccess), [ queueRequest ])
  const execPost = useCallback((payload: Payload, onSuccess?: Callback) => queueRequest("post", payload, onSuccess), [ queueRequest ])
  const execPut = useCallback((payload: Payload, onSuccess?: Callback) => queueRequest("put", payload, onSuccess), [ queueRequest ])
  const execPatch = useCallback((payload: Payload, onSuccess?: Callback) => queueRequest("patch", payload, onSuccess), [ queueRequest ])
  const execDelete = useCallback((onSuccess?: Callback) => queueRequest("delete", undefined, onSuccess), [ queueRequest ])

  // reFetch whenever our cache is invalidated
  const data = getCacheItem(url) as Schema
  useEffect(() => {
    if (!data) { execGet() }
  }, [ execGet, data ])

  return {
    data,
    isBusy: isRequestPendingInQueue(url, "get"),

    execGet,
    execPost,
    execPut,
    execPatch,
    execDelete
  }
}


export default useApiRequest
