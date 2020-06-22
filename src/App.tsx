import React from "react"
import { ThemeProvider, GlobalStyle } from "@datapunt/asc-ui"

import Router from "./app/features/shared/routing/Router"

const App: React.FC = () => (
  <ThemeProvider>
      <GlobalStyle />
      <Router />
  </ThemeProvider>
)

export default App
