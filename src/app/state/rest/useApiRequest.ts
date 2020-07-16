import axios, { AxiosError, AxiosResponse, Method } from "axios"
import { useState, useCallback, useEffect, useContext } from "react"

import { getToken } from "../auth/tokenStore"
import { useFlashMessages } from "../flashMessages/useFlashMessages"
import { ApiCacheContext } from "./ApiCacheProvider"
import useIsMounted from "../../features/shared/hooks/useIsMounted/useIsMounted"

type Config = {
  url: string
}

const pending: Record<string, Promise<AxiosResponse<any>>> = {}

const useApiRequest = <SCHEMA>({ url }: Config) => {
  const [ isBusy, setIsBusy ] = useState(false)
  const { cache, setItem, clear } = useContext(ApiCacheContext)
  const [ error, setError ] = useState()
  const { addErrorFlashMessage } = useFlashMessages()
  const isMounted = useIsMounted()

  // Get authorization token from localStorage
  const authorizationToken = getToken()

  // Handle API errors:
  const handleError = useCallback((error: AxiosError) => {
    const details = error?.response?.data?.detail ?? error.message

    setError(details)
    addErrorFlashMessage("Oeps er ging iets mis!", `${ details } (URL: ${ error?.config?.url })`)

    return Promise.reject(details)
  }, [setError, addErrorFlashMessage])

  // Execute an API request
  const exec = useCallback(async (method: Method, payload?: {}) => {
    try {
      setIsBusy(true)

      const promise: Promise<AxiosResponse<SCHEMA>> = pending[url]
        ?  pending[url]
        :  axios.request<SCHEMA>({
            headers: { Authorization: `Bearer ${ authorizationToken }` },
            method,
            url,
            data: payload
          })

      pending[url] = promise
      const response = await promise
      delete pending[url]

      if (isMounted.current) {
        method !== "get"
          ? clear()
          : setItem(url, response.data)
        setIsBusy(false)
      }

      return Promise.resolve(response.data)
    } catch(error) {
        return handleError(error)
    }
  }, [ url, authorizationToken, setIsBusy, handleError, isMounted, setItem, clear ])

  // Syntax sugar for different methods:
  const execGet = useCallback(() => exec("get"), [ exec ])
  const execPost = useCallback((payload: {}) => exec("post", payload), [ exec ])
  const execPut = useCallback((payload: {}) => exec("put", payload), [ exec ])
  const execPatch = useCallback((payload: {}) => exec("patch", payload), [ exec ])
  const execDelete = useCallback((payload: {}) => exec("delete", payload), [ exec ])

  // reFetch whenever our cache is invalidated
  const data = cache[url]
  useEffect(() => { if (!data) { execGet() } }, [ execGet, data ])

  return {
    isBusy,
    data,
    error,
    execGet,
    execPost,
    execPut,
    execPatch,
    execDelete
  }
}


export default useApiRequest
