import React from "react"
import { ThemeProvider, GlobalStyle } from "@datapunt/asc-ui"

import Router from "app/features/shared/routing/Router"
import GlobalStateProvider from "app/state/state/GlobalStateProvider"

const App: React.FC = () => (
  <ThemeProvider>
    <GlobalStyle />
    <GlobalStateProvider>
      <Router />
    </GlobalStateProvider>
  </ThemeProvider>
)

export default App
