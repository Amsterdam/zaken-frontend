import React from "react"
import { GlobalStateProvider } from "./globalState"
import { useRestActions } from "globalstate-hooks"
import { api } from "./config"

const Provider: React.FC = ({ children }) => {
  const [cases, casesActions] = useRestActions<API.Case>({
    api: { ...api, name: "cases" },
    idKey: "uuid",
    shouldIndex: true
  })
  const [caseTypes, caseTypesActions] = useRestActions<API.CaseType>({
    api: { ...api, name: "case-types" },
    idKey: "uuid",
    shouldIndex: true
  })

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
    <GlobalStateProvider value={ value }>
      { children }
    </GlobalStateProvider>
  )
}
export default Provider
