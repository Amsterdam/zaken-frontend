import axios, { AxiosError, Method } from "axios"
import { useCallback, useEffect, useContext, useState } from "react"

import useIsMounted from "app/features/shared/hooks/useIsMounted/useIsMounted"

import { getToken } from "../auth/tokenStore"
import { useFlashMessages } from "../flashMessages/useFlashMessages"
import { ApiCacheContext } from "./ApiCacheProvider"
import { GroupConfig } from "./createGroupConfig"

type Config = {
  url: string
  group: GroupConfig
}

const useApiRequest = <SCHEMA>({ url, group: { pending, queue, groupName } }: Config) => {
  const [ isBusy, setIsBusy ] = useState(false)
  const isMounted = useIsMounted()
  const { getItem, setItem, clear } = useContext(ApiCacheContext)
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
    try {
      const response = await axios.request<SCHEMA>({
        headers: { Authorization: `Bearer ${ authorizationToken }` },
        method,
        url,
        data: payload
      })

      if (method !== "get") {
        clear(groupName)
      } else {
        setItem(groupName, url, response.data)
      }

      delete pending[method + url]

      if (isMounted.current) {
        setIsBusy(false)
      }

      return Promise.resolve(response.data)
    } catch(error) {
      return handleError(error)
    }
  }, [clear, setItem, authorizationToken, url, groupName, pending, setIsBusy, isMounted, handleError])

  /**
   * Queues an API request
   */
  const queueRequest = useCallback(async (method: Method, payload?: {}) => {
    if (pending[method + url] === undefined) {
      setIsBusy(true)
      pending[method + url] = true
      return queue.push(() => execRequest(method, payload))
    }
  }, [ execRequest, url, pending, queue, setIsBusy ])

  /**
   * Define HTTP methods
   */
  const execGet = useCallback(() => queueRequest("get"), [ queueRequest ])
  const execPost = useCallback((payload: {}) => queueRequest("post", payload), [ queueRequest ])
  const execPut = useCallback((payload: {}) => queueRequest("put", payload), [ queueRequest ])
  const execPatch = useCallback((payload: {}) => queueRequest("patch", payload), [ queueRequest ])
  const execDelete = useCallback((payload: {}) => queueRequest("delete", payload), [ queueRequest ])

  // reFetch whenever our cache is invalidated
  const data = getItem(groupName, url)
  useEffect(() => { if (!data) { execGet() } }, [ execGet, data ])

  return {
    data,
    isBusy,

    execGet,
    execPost,
    execPut,
    execPatch,
    execDelete
  }
}


export default useApiRequest
