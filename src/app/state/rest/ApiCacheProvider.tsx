import React from "react"
import { ApiCache, useApiCache } from "./useApiCache"

const noop = () => {}
export const ApiCacheContext = React.createContext<ApiCache>({
  cache: {},
  setItem: noop,
  clear: noop
})

const ApiCacheProvider: React.FC = ({ children }) => {
  const cache = useApiCache()

  return <ApiCacheContext.Provider value={cache}>
    {children}
  </ApiCacheContext.Provider>
}

export default ApiCacheProvider
