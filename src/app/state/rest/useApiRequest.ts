import axios, { AxiosError, AxiosResponse, Method } from "axios"
import { useState, useCallback, useEffect } from "react"
import slashSandwich from "slash-sandwich"

import { getToken } from "../auth/tokenStore"
import cache from "./CacheStore"
import { useFlashMessages } from "../flashMessages/useFlashMessages"

type Config = {
  group: string
  url: string
}

/**
 * Setup axios-client:
 * - Configures a cache adapter
 */
const api = axios.create({
  adapter: cache.adapter
})

const pending: Record<string, Promise<any>> = {}

const useApiRequest = <SCHEMA>({ url, group }: Config) => {
  const [ isBusy, setIsBusy ] = useState(false)
  const [ data, setData ] = useState<SCHEMA>()
  const [ error, setError ] = useState()
  const { addErrorFlashMessage } = useFlashMessages()

  const token = getToken()

  /**
   * Handle API error
   */
  const handleError = useCallback((error: AxiosError) => {
    const details = error?.response?.data?.detail ?? error.message

    setError(details)
    addErrorFlashMessage("Oeps er ging iets mis!", `${ details } (URL: ${ error?.config?.url })`)

    return Promise.reject(details)
  }, [setError, addErrorFlashMessage])

  /**
   * Execute API request
   */
  const exec = useCallback(async (method: Method, payload?: {}) => {
    setIsBusy(true)

    try {
      const headers = {
        Authorization: `Bearer ${ token }`
      }

      const promise: Promise<AxiosResponse<SCHEMA>> =
        // Is this request pending already?
        pending[url] === undefined
          // ...no its not! Execute request
          ? api.request<SCHEMA>({
              headers,
              method,
              url: slashSandwich([process.env.REACT_APP_GATEWAY, url]),
              data: payload,
              cache: { key: () => group }
          })
          // ...yes it is, return the already pending request...
          : pending[url]

      // Save promise in pending object.
      pending[url] = promise

      // Wait for the promise to resolve:
      const response = await promise
      // Delete pending promise
      delete pending[url]

      // Update state:
      setData(response.data)
      setIsBusy(false)

      return Promise.resolve(response.data)
    } catch(error) {
      return handleError(error)
    }
  }, [ url, group, token, setData, setIsBusy, handleError ])

  // Syntax sugar for different methods:
  const execGet = useCallback(() => exec("get"), [ exec ])
  const execPost = useCallback((payload: {}) => exec("post", payload), [ exec ])
  const execPut = useCallback((payload: {}) => exec("put", payload), [ exec ])
  const execPatch = useCallback((payload: {}) => exec("patch", payload), [ exec ])
  const execDelete = useCallback((payload: {}) => exec("delete", payload), [ exec ])

  // onMount, execute get:
  useEffect(() => { execGet() }, [ execGet ])

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
