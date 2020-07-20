import axios, { AxiosError, Method } from "axios"
import { useCallback, useEffect, useContext } from "react"

import { getToken } from "../auth/tokenStore"
import { useFlashMessages } from "../flashMessages/useFlashMessages"
import { ApiContext } from "./ApiProvider"

type Config = {
  url: string
  groupName: string
}

const useApiRequest = <Schema>({ url, groupName }: Config) => {
  const { getCacheItem, setCacheItem, clearCache, pushRequest, isPendingRequest } = useContext(ApiContext)
  const { addErrorFlashMessage } = useFlashMessages()
  const authorizationToken = getToken()

  /**
   * Handles API errors
   */
  const handleError = useCallback((error: AxiosError) => {
    const details = error?.response?.data?.detail ?? error.message
    addErrorFlashMessage("Oeps er ging iets mis!", `${ details } (URL: ${ error?.config?.url })`)
  }, [addErrorFlashMessage])

  /**
   * Executes an API request
   */
  const execRequest = useCallback(async (method: Method, payload: any) => {
    try {
      const response = await axios.request<Schema>({
        headers: { Authorization: `Bearer ${ authorizationToken }` },
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
      handleError(error)
    }
  }, [clearCache, setCacheItem, authorizationToken, url, groupName, handleError])

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
