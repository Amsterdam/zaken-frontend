import React, { useState, useEffect } from "react"

import { keycloak, Keycloak } from "./keycloak"
import options from "./options"

export type Context = {
  isInitialized: boolean
  isAuthenticated: boolean
  keycloak: Keycloak
}
export const KeycloakContext = React.createContext<Context|undefined>(undefined)

type Props = {
  shouldInitialize?: boolean
  initializedCallback?: (keycloak: Keycloak, isAuthenticated: boolean) => Promise<void>
}

const KeycloakProvider: React.FC<Props> = ({ shouldInitialize = true, initializedCallback, children }) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (shouldInitialize === false) return
    (async () => {
      try {
        const isAuthenticated = await keycloak.init(options)
        setIsInitialized(true)
        setIsAuthenticated(isAuthenticated)
        if (initializedCallback !== undefined) await initializedCallback(keycloak, isAuthenticated)
      } catch {
        console.error("Keycloak failed to initialize")
      }
    })()
  }, [initializedCallback, shouldInitialize])

  const value = {
    isInitialized,
    isAuthenticated,
    keycloak
  }

  return (
    <KeycloakContext.Provider value={ value }>
      { children }
    </KeycloakContext.Provider>
  )
}
export default KeycloakProvider
