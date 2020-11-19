import React, { useState, useEffect } from "react"
import { navigate } from "@reach/router"

import { keycloak, Keycloak } from "./keycloak"

import to from "app/features/shared/routing/to"
import { makeGatewayUrl } from "app/state/rest/hooks/utils/utils"
import createAuthHeaders from "app/state/rest/hooks/utils/createAuthHeaders"

export type Context = {
  token: string | undefined
  keycloak: Keycloak
}
export const KeycloakContext = React.createContext<Context|undefined>(undefined)

const options = {
  onLoad: "login-required",
  checkLoginIframe: false
}

const KeycloakProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>()

  useEffect(() => {
    (async () => {
      try {
        const isAuthenticated = await keycloak.init(options)
        if (isAuthenticated) {
          setToken(keycloak.token)
          const response = await fetch(makeGatewayUrl("is-authorized"), {
            headers: {
              ...createAuthHeaders(keycloak.token),
              "Content-Type": "application/json"
            }
          })
          const { is_authorized } = await response.json()
          if (is_authorized === false) navigate(to("/auth"))
        } else {
          console.log("Keycloak failed to authenticate")
        }
      } catch {
        console.error("Keycloak failed to initialize")
      }
    })()
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
