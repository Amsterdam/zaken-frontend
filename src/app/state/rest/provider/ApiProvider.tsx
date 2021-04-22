import { createContext } from "react"

import { ApiCache, useApiCache } from "../hooks/useApiCache"
import { RequestQueue, useRequestQueue } from "../hooks/useRequestQueue"
import { noopContext } from "./noopContext"

import { ApiGroup } from "../index"

type GroupedContext = Record<ApiGroup, ApiCache & RequestQueue>
export const ApiContext = createContext<GroupedContext>({
  auth: noopContext,
  authors: noopContext,
  addresses: noopContext,
  cases: noopContext,
  case: noopContext,
  dataPunt: noopContext,
  fines: noopContext,
  permits: noopContext,
  supportContacts: noopContext,
  teams: noopContext
})

const ApiProvider: React.FC = ({ children }) => {
  const value: GroupedContext = {
    auth: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    authors: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    addresses: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    cases: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    case: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    fines: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    dataPunt: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    permits: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    supportContacts: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    teams: {
      ...useApiCache(),
      ...useRequestQueue()
    }
  }

  return (
    <ApiContext.Provider value={ value }>
      { children }
    </ApiContext.Provider>
  )
}

export default ApiProvider
