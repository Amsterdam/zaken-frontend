import React from "react"
import { ThemeProvider, GlobalStyle } from "@datapunt/asc-ui"
import { Router } from "@reach/router"

import HomePage from "app/features/poc/pages/home/HomePage"

const App: React.FC = () => (
  <ThemeProvider>
      <GlobalStyle />
      <Router>
        <HomePage path="/" />
      </Router>
  </ThemeProvider>
)


export default App
