import React from "react"
import { ThemeProvider, GlobalStyle } from "@datapunt/asc-ui"
import { LocationProvider } from "@reach/router"

import Router from "app/features/shared/routing/Router"
import GlobalStateProvider from "app/state/state/GlobalStateProvider"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import Debug from "./app/state/state/Debug"

const App: React.FC = () => (
  <ThemeProvider>
    <GlobalStyle />
    <LocationProvider>
      <GlobalStateProvider>
        <FlashMessageProvider>
          <Router />
          { process.env.REACT_APP_DEBUG_MODE && <Debug /> }
        </FlashMessageProvider>
      </GlobalStateProvider>
    </LocationProvider>
  </ThemeProvider>
)

export default App
