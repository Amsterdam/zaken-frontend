import React, { useEffect, useState } from "react"
import { ThemeProvider, GlobalStyle } from "@amsterdam/asc-ui"
import { BrowserRouter } from "react-router-dom"
import { hasAuthParams, useAuth } from "react-oidc-context"
import Router from "app/routing/components/Router"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import ApiProvider from "app/state/rest/provider/ApiProvider"
import ValueProvider from "app/state/context/ValueProvider"
import PageTitle from "app/routing/components/PageTitle"
import { LoadingScreenBasic, FullScreenWrapper } from "app/components/shared/loading"
import FeedbackWrapper from "app/components/FeedbackWrapper"

const App = () => {
  const auth = useAuth()
  const [hasTriedSignin, setHasTriedSignin] = useState(false)

  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin
    ) {
      const currentUrl = new URL(window.location.href)
      const fullPathWithQuery = `${ currentUrl.pathname }${ currentUrl.search }`

      auth.signinRedirect({        
        url_state: fullPathWithQuery 
      })
      setHasTriedSignin(true)
    }
  }, [auth, hasTriedSignin])

  if (auth.isLoading) {
    return <LoadingScreenBasic/>
  }

  if (auth.error) {
    return <FullScreenWrapper>Oops... {auth.error.message}</FullScreenWrapper>
  }

  if (!auth.isAuthenticated) {
    return <FullScreenWrapper>Sorry, het is niet gelukt om in te loggen.</FullScreenWrapper>
  }

  return (
    <React.Fragment>
      <PageTitle />
      <ThemeProvider>
        <GlobalStyle />
        <BrowserRouter>
          <FlashMessageProvider>
            <ApiProvider>
              <ValueProvider>
                <FeedbackWrapper />
                <Router />
              </ValueProvider>
            </ApiProvider>
          </FlashMessageProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
