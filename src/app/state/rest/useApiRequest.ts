import axios, { AxiosError, Method } from "axios"
import { useCallback, useEffect, useContext, useState } from "react"

import { getToken } from "../auth/tokenStore"
import { useFlashMessages } from "../flashMessages/useFlashMessages"
import { ApiCacheContext } from "./ApiCacheProvider"
import PromiseQueue from "./PromiseQueue"

type Config = {
  url: string
}

const queue = new PromiseQueue()
const pending: Record<string, boolean> = {}

const useApiRequest = <SCHEMA>({ url }: Config) => {
  const [ isDeleted, setIsDeleted ] = useState(false)
  const { cache, setItem, clear } = useContext(ApiCacheContext)
  const { addErrorFlashMessage } = useFlashMessages()
  const authorizationToken = getToken()

  /**
   * Handles API errors
   */
  const handleError = useCallback((error: AxiosError) => {
    const details = error?.response?.data?.detail ?? error.message
    addErrorFlashMessage("Oeps er ging iets mis!", `${ details } (URL: ${ error?.config?.url })`)
    return Promise.reject(details)
  }, [addErrorFlashMessage])

  /**
   * Executes an API request
   */
  const execRequest = useCallback(async (method: Method, payload: any) => {
    const response = await axios.request<SCHEMA>({
      headers: { Authorization: `Bearer ${ authorizationToken }` },
      method,
      url,
      data: payload
    })

    if (method !== "get") {
      clear()
    } else {
      setItem(url, response.data)
    }

    if (method === "delete") {
      // Mark item as deleted, we don't want to fetch it when cache invalidates
      setIsDeleted(true)
    }

    delete pending[url]
    return Promise.resolve(response.data)
  }, [clear, setItem, authorizationToken, url])

  /**
   * Queues an API request
   */
  const queueRequest = useCallback(async (method: Method, payload?: {}) => {
    try {
      if (pending[url] === undefined) {
        pending[url] = true
        return queue.push(() => execRequest(method, payload))
      }
    } catch(error) {
        return handleError(error)
    }
  }, [ handleError, execRequest, url ])

  /**
   * Define HTTP methods
   */
  const execGet = useCallback(() => queueRequest("get"), [ queueRequest ])
  const execPost = useCallback((payload: {}) => queueRequest("post", payload), [ queueRequest ])
  const execPut = useCallback((payload: {}) => queueRequest("put", payload), [ queueRequest ])
  const execPatch = useCallback((payload: {}) => queueRequest("patch", payload), [ queueRequest ])
  const execDelete = useCallback((payload: {}) => queueRequest("delete", payload), [ queueRequest ])

  // reFetch whenever our cache is invalidated
  const data = cache[url]
  useEffect(() => { if (!data && !isDeleted) { execGet() } }, [ execGet, data, isDeleted ])

  return {
    data,

    execGet,
    execPost,
    execPut,
    execPatch,
    execDelete
  }
}


export default useApiRequest
