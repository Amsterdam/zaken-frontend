import React from "react"

import { ApiCache, useApiCache } from "../hooks/useApiCache"
import { RequestQueue, useRequestQueue } from "../hooks/useRequestQueue"
import { noopContext } from "./noopContext"

import { ApiGroup } from "../index"

type GroupedContext = Record<ApiGroup, ApiCache & RequestQueue>
export const ApiContext = React.createContext<GroupedContext>({
  auth: noopContext,
  addresses: noopContext,
  cases: noopContext,
  caseTypes: noopContext,
  caseStates: noopContext,
  dataPunt: noopContext,
  permits: noopContext,
  supportContacts: noopContext,
  teams: noopContext,
  reasons: noopContext
})

const ApiProvider: React.FC = ({ children }) => {
  const value: GroupedContext = {
    auth: {
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
    caseTypes: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    caseStates: {
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
    },
    reasons: {
      ...useApiCache(),
      ...useRequestQueue()
    }
  }

  return <ApiContext.Provider value={value}>
    {children}
  </ApiContext.Provider>
}

export default ApiProvider
