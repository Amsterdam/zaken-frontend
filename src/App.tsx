import React from "react"
import { ThemeProvider, GlobalStyle } from "@datapunt/asc-ui"
import { LocationProvider } from "@reach/router"

import Router from "app/features/shared/routing/Router"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import AuthSession from "./app/state/auth/AuthSession"
import ApiProvider from "./app/state/rest/ApiProvider"

const App: React.FC = () => (
  <ThemeProvider>
    <GlobalStyle />
    <LocationProvider>
      <FlashMessageProvider>
        <ApiProvider>
          <AuthSession />
          <Router />
        </ApiProvider>
      </FlashMessageProvider>
    </LocationProvider>
  </ThemeProvider>
)


export default App
