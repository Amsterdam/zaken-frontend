import { Fragment } from "react"
import { ThemeProvider, GlobalStyle } from "@amsterdam/asc-ui"
import { BrowserRouter } from "react-router-dom"

import KeycloakProvider from "app/state/auth/keycloak/KeycloakProvider"
import initializedCallback from "app/state/auth/keycloak/initializedCallback"
import Router from "app/routing/components/Router"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import ApiProvider from "app/state/rest/provider/ApiProvider"
import ValueProvider from "app/state/context/ValueProvider"
import isLocalDevelopment from "app/state/auth/keycloak/isLocalDevelopment"
import { ErrorBoundary } from "@sentry/react"
import PageTitle from "app/routing/components/PageTitle"
import { env } from "app/config/env"

const SentryErrorBoundary = env.REACT_APP_ENVIRONMENT !== undefined ? ErrorBoundary : Fragment

const App = () => (
  <SentryErrorBoundary>
    <PageTitle />
    <ThemeProvider>
      <GlobalStyle />
      <KeycloakProvider
        shouldInitialize={ isLocalDevelopment === false }
        initializedCallback={ initializedCallback }
      >
        <BrowserRouter>
          <FlashMessageProvider>
            <ApiProvider>
              <ValueProvider>
                <Router />
              </ValueProvider>
            </ApiProvider>
          </FlashMessageProvider>
        </BrowserRouter>
      </KeycloakProvider>
    </ThemeProvider>
  </SentryErrorBoundary>
)

export default App
