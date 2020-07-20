import React from "react"
import { ApiCache, useApiCache } from "./useApiCache"
import { RequestQueue, useRequestQueue } from "./useRequestQueue"

const noopUndefined = () => undefined
const noopBoolean = () => false
export const ApiContext = React.createContext<ApiCache & RequestQueue>({
  isPendingRequest: noopBoolean,
  pushRequest: noopUndefined,
  getCacheItem: noopUndefined,
  setCacheItem: noopUndefined,
  clearCache: noopUndefined
})

const ApiProvider: React.FC = ({ children }) => {
  const cache = useApiCache()
  const queue = useRequestQueue()

  return <ApiContext.Provider value={{ ...cache, ...queue }}>
    {children}
  </ApiContext.Provider>
}

export default ApiProvider
