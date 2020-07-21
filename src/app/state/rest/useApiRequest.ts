import axios, { AxiosError, Method } from "axios"
import { useCallback, useEffect, useContext } from "react"

import { ApiContext } from "./ApiProvider"

type Config = {
  url: string
  groupName: string
  handleError?: ( error: AxiosError ) => void
  getHeaders?: () => Record<string, string>
}

const useApiRequest = <Schema>({ url, groupName, handleError, getHeaders }: Config) => {
  const {
    getCacheItem,
    setCacheItem,
    clearCache,
    pushRequest,
    isPendingRequest
  } = useContext(ApiContext)

  /**
   * Executes an API request
   */
  const execRequest = useCallback(async (method: Method, payload: any) => {
    try {
      const response = await axios.request<Schema>({
        headers: getHeaders ? getHeaders() : undefined,
        method,
        url,
        data: payload
      })

      if (method !== "get") {
        clearCache(groupName)
      } else {
        setCacheItem(groupName, url, response.data)
      }
    } catch(error) {
      if (handleError) {
        handleError(error)  
      }
    }
  }, [clearCache, setCacheItem, url, groupName, handleError, getHeaders])

  /**
   * Queues an API request
   */
  const queueRequest = useCallback(async (method: Method, payload?: {}) =>
    pushRequest(url, method, () => execRequest(method, payload))
  , [ execRequest, url, pushRequest ])

  /**
   * Define HTTP methods
   */
  const execGet = useCallback(() => queueRequest("get"), [ queueRequest ])
  const execPost = useCallback((payload: {}) => queueRequest("post", payload), [ queueRequest ])
  const execPut = useCallback((payload: {}) => queueRequest("put", payload), [ queueRequest ])
  const execPatch = useCallback((payload: {}) => queueRequest("patch", payload), [ queueRequest ])
  const execDelete = useCallback((payload: {}) => queueRequest("delete", payload), [ queueRequest ])

  // reFetch whenever our cache is invalidated
  const data = getCacheItem(groupName, url)
  useEffect(() => { if (!data) { execGet() } }, [ execGet, data ])

  return {
    data,
    isBusy: isPendingRequest(url),

    execGet,
    execPost,
    execPut,
    execPatch,
    execDelete
  }
}


export default useApiRequest
