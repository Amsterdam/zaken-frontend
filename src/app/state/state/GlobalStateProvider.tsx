import React from "react"
import GlobalStateContext from "./GlobalStateContext"
import { useRestActions } from "globalstate-hooks"
import { api } from "./config"

const GlobalStateProvider: React.FC = ({ children }) => {
  const [cases, casesActions] = useRestActions<API.Case>({ api: { ...api, name: "cases" } })
  const [caseTypes, caseTypesActions] = useRestActions<API.CaseType>({ api: { ...api, name: "case-types" } })

  const value = {
    state: {
      cases,
      caseTypes
    },
    actions: {
      cases: casesActions,
      caseTypes: caseTypesActions
    }
  }

  return (
    <GlobalStateContext.Provider value={ value }>
      { children }
    </GlobalStateContext.Provider>
  )
}
export default GlobalStateProvider
