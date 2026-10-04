import React, { useEffect, useState } from "react"
import { ThemeProvider, GlobalStyle } from "@amsterdam/asc-ui"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "@/api/queryClient"
import { hasAuthParams, useAuth } from "react-oidc-context"
import Router from "app/routing/components/Router"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import PageTitle from "app/routing/components/PageTitle"
import { AmsterdamCrossSpinner } from "@/components/spinners/AmsterdamCrossSpinner/AmsterdamCrossSpinner"
import { FullScreenWrapper } from "app/components/shared/loading"
import { Feedback } from "@/components/Feedback/Feedback"

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
      const fullPathWithQuery = `${currentUrl.pathname}${currentUrl.search}`

      auth.signinRedirect({
        url_state: fullPathWithQuery,
      })
      setHasTriedSignin(true)
    }
  }, [auth, hasTriedSignin])

  if (auth.isLoading) {
    return <AmsterdamCrossSpinner />
  }

  if (auth.error) {
    return <FullScreenWrapper>Oops... {auth.error.message}</FullScreenWrapper>
  }

  if (!auth.isAuthenticated) {
    return (
      <FullScreenWrapper>
        Sorry, het is niet gelukt om in te loggen.
      </FullScreenWrapper>
    )
  }

  return (
    <React.Fragment>
      <ThemeProvider>
        <GlobalStyle />
        <BrowserRouter>
          <FlashMessageProvider>
            <QueryClientProvider client={queryClient}>
              <ToastProvider>
                <PageTitle />
                <Feedback />
                <Router />
              </ToastProvider>
              {import.meta.env.DEV && <ReactQueryDevtools />}
            </QueryClientProvider>
          </FlashMessageProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
