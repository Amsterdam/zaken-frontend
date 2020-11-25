import React from "react"
import { ThemeProvider, GlobalStyle } from "@datapunt/asc-ui"
import { LocationProvider } from "@reach/router"

import KeycloakProvider from "app/state/auth/keycloak/KeycloakProvider"
import initializedCallback from "app/state/auth/keycloak/initializedCallback"
import Router from "app/features/shared/routing/Router"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import ApiProvider from "./app/state/rest/provider/ApiProvider"
import isLocalDevelopment from "./app/state/auth/keycloak/isLocalDevelopment"

const App: React.FC = () => (
  <ThemeProvider>
    <GlobalStyle />
    <KeycloakProvider shouldInitialize={ isLocalDevelopment === false } initializedCallback={ initializedCallback }>
      <LocationProvider>
        <FlashMessageProvider>
          <ApiProvider>
            <Router />
          </ApiProvider>
        </FlashMessageProvider>
      </LocationProvider>
    </KeycloakProvider>
  </ThemeProvider>
)


export default App
