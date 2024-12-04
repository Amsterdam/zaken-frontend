import React, { useEffect, useState } from "react"
import { ThemeProvider, GlobalStyle } from "@amsterdam/asc-ui"
import { BrowserRouter } from "react-router-dom"
import { hasAuthParams, useAuth } from "react-oidc-context"
import Router from "app/routing/components/Router"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import ApiProvider from "app/state/rest/provider/ApiProvider"
import ValueProvider from "app/state/context/ValueProvider"
import PageTitle from "app/routing/components/PageTitle"
// import { env } from "app/config/env"
import { LoadingScreenBasic, FullScreenWrapper } from "app/components/shared/loading"

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
      // TODO: Redirect to the current URL after login
      // Redirect uri must be change to enable this: http://localhost:2999/*  ?
      // auth.signinRedirect({
      //   redirect_uri: `${ env.VITE_OIDC_REDIRECT_URL }${ window.location.pathname }`
      // })
      auth.signinRedirect()
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
