import React, { useState, useEffect } from "react"
import { keycloak, Keycloak } from "./keycloak"

export type Context = {
  token: string | undefined
  keycloak: Keycloak
}
export const KeycloakContext = React.createContext<Context|undefined>(undefined)

const KeycloakProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>()
  
  useEffect(() => {
    keycloak.init({
      onLoad: "login-required",
      checkLoginIframe: false
    }).then((authenticated: boolean) => {
      if (authenticated) {
        setToken(keycloak.token)
      } else {
        console.log("Keycloak failed to authenticate")
      }
    }).catch(() => {
      console.error("Keycloak failed to initialize")
    })
  }, [])

  const value = {
    token,
    keycloak
  }

  return (
    <KeycloakContext.Provider value={ value }>
      { children }
    </KeycloakContext.Provider>
  )
}
export default KeycloakProvider
