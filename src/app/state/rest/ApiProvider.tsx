import React from "react"
import { ApiCache, useApiCache } from "./useApiCache"
import { RequestQueue, useRequestQueue } from "./useRequestQueue"

const noop = (...args: any[]): any => {}
export const ApiContext = React.createContext<ApiCache & RequestQueue>({
  isPendingRequest: noop,
  pushRequest: noop,
  getCacheItem: noop,
  setCacheItem: noop,
  clearCache: noop
})

const ApiProvider: React.FC = ({ children }) => {
  const cache = useApiCache()
  const queue = useRequestQueue()

  return <ApiContext.Provider value={{ ...cache, ...queue }}>
    {children}
  </ApiContext.Provider>
}

export default ApiProvider
