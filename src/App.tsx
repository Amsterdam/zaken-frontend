import React from "react"
import { ThemeProvider, GlobalStyle } from "@datapunt/asc-ui"
import { LocationProvider } from "@reach/router"

import Router from "app/features/shared/routing/Router"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import AuthSession from "./app/state/auth/AuthSession"

const App: React.FC = () => (
  <ThemeProvider>
    <GlobalStyle />
    <LocationProvider>
      <FlashMessageProvider>
        <AuthSession />
        <Router />
      </FlashMessageProvider>
    </LocationProvider>
  </ThemeProvider>
)


export default App
