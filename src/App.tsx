import React from "react"
import { ThemeProvider, GlobalStyle } from "@amsterdam/asc-ui"
import { LocationProvider } from "@reach/router"

import KeycloakProvider from "app/state/auth/keycloak/KeycloakProvider"
import initializedCallback from "app/state/auth/keycloak/initializedCallback"
import Router from "app/routing/components/Router"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import ApiProvider from "./app/state/rest/provider/ApiProvider"
import isLocalDevelopment from "./app/state/auth/keycloak/isLocalDevelopment"
import { ErrorBoundary } from "@sentry/react"

const App: React.FC = () => (
  <ErrorBoundary>
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
  </ErrorBoundary>
)

export default App
