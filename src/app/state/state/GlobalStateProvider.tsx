import React from "react"
import { GlobalStateProvider } from "./globalState"
import { useRestActions } from "globalstate-hooks"
import { api } from "./config"

const Provider: React.FC = ({ children }) => {
  const [cases, casesActions] = useRestActions<API.Case>({ api: { ...api, name: "cases" } })

  const value = {
    state: { cases },
    actions: { cases: casesActions }
  }

  return (
    <GlobalStateProvider value={ value }>
      { children }
    </GlobalStateProvider>
  )
}
export default Provider
