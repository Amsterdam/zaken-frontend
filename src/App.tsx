import { useEffect, useState } from "react"
import { RouterProvider } from "react-router/dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "@/api/queryClient"
import { hasAuthParams, useAuth } from "react-oidc-context"
import { router } from "@/router"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import { AmsterdamCrossSpinner } from "@/components/spinners/AmsterdamCrossSpinner/AmsterdamCrossSpinner"
import { FullScreenWrapper } from "@/app/components/shared/loading"
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
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Feedback />
        <RouterProvider router={router} />
      </ToastProvider>
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}

export default App
