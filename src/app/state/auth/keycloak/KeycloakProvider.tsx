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
      } catch (err) {
        console.error("Keycloak failed to initialize")
        console.error(err)
      }
    })()
  }, [initializedCallback, shouldInitialize])

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log(keycloak, keycloak.isTokenExpired())
      const isUpdated = await keycloak.updateToken(30)
      if (isUpdated && process.env.REACT_APP_ENVIRONMENT !== "production") console.log("Keycloak token refreshed")
    }, 1 * 60 * 1000) // 1 minute
    return () => clearInterval(interval)
  }, [])

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
