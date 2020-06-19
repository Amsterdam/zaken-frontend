import React, { useCallback, useEffect } from "react"
import GlobalStateContext from "./GlobalStateContext"
import { useRestActions } from "globalstate-hooks"
import { api } from "./config"

const GlobalStateProvider: React.FC = ({ children }) => {
  const [cases, casesActions] = useRestActions<API.Case>({ api: { ...api, name: "cases" } })

  const index = useCallback(casesActions.index, [])
  useEffect(() => { index() }, [index])

  const value = {
    state: { cases },
    actions: { cases: casesActions }
  }

  return (
    <GlobalStateContext.Provider value={ value }>
      { children }
    </GlobalStateContext.Provider>
  )
}
export default GlobalStateProvider
