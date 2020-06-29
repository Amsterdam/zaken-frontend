import React, { useEffect } from "react"
import { GlobalStateProvider } from "./globalState"
import { useRestActions } from "globalstate-hooks"
import { api } from "./config"

const Provider: React.FC = ({ children }) => {
  const [cases, casesActions] = useRestActions<API.Case>({ api: { ...api, name: "cases" }, idKey: "uuid" })
  const [caseTypes, caseTypesActions] = useRestActions<API.CaseType>({ api: { ...api, name: "case-types" }, idKey: "uuid" })

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

  // TODO: Use globalstate-hooks Config.shouldIndex
  const { index: casesIndex } = casesActions
  const { index: caseTypesIndex } = caseTypesActions
  useEffect(() => {
    casesIndex()
    caseTypesIndex()
  }, [casesIndex, caseTypesIndex])

  return (
    <GlobalStateProvider value={ value }>
      { children }
    </GlobalStateProvider>
  )
}
export default Provider
