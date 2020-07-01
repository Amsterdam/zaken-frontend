import React from "react"
import { ThemeProvider, GlobalStyle } from "@datapunt/asc-ui"

import Router from "app/features/shared/routing/Router"
import GlobalStateProvider from "app/state/state/GlobalStateProvider"
import Debug from "./app/state/state/Debug"

const App: React.FC = () => (
  <ThemeProvider>
    <GlobalStyle />
    <GlobalStateProvider>
      <Router />
      { process.env.REACT_APP_DEBUG_MODE && 
        <Debug />
      }
    </GlobalStateProvider>
  </ThemeProvider>
)

export default App
