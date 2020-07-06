import axios, { AxiosResponse, Method } from "axios"
import { useState, useCallback, useEffect } from "react"

import cache from "./CacheStore"

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

  const exec = useCallback(async (method: Method, payload?: {}) => {
    setIsBusy(true)

    try {
      const promise: Promise<AxiosResponse<SCHEMA>> =
        // Is this request pending already?
        pending[url] === undefined
          // ...no its not! Execute request
          ? api.request<SCHEMA>({
              method,
              url: `${ process.env.REACT_APP_GATEWAY_HOST }/${ process.env.REACT_APP_GATEWAY_PATH }/${ url }/`,
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
      // An error occurred!
      // Save error-message to state
      setError(error.message)
      return Promise.reject(error.message)
    }
  }, [ url, group, setData, setIsBusy ])

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

    exec,
    execGet,
    execPost,
    execPut,
    execPatch,
    execDelete
  }
}


export default useApiRequest
