import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"
import { normalizeApiError } from "@/api/utils/normalizeApiError"
import { addErrorFlashMessageOutsideReact } from "app/state/flashMessages/flashMessageBridge"

/**
 * Meta options queries/mutations can pass to opt out of the global error
 * message, e.g. `useQuery({ ..., meta: { globalErrorToast: false } })`.
 * Use this when the error is already shown inline, so the user doesn't see
 * the same failure twice.
 */
declare module "@tanstack/react-query" {
  // Module augmentation only works with an interface.
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    queryMeta: {
      globalErrorToast?: boolean
    }
    mutationMeta: {
      globalErrorToast?: boolean
    }
  }
}

/**
 * Same title and body as the old useErrorHandler, so users see no difference.
 */
export const showApiErrorFlashMessage = (error: unknown) => {
  const { detail, message, url } = normalizeApiError(error)
  addErrorFlashMessageOutsideReact(
    "Oeps er ging iets mis!",
    `${detail ?? (message || "-")} (URL: ${url ?? "-"})`,
  )
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 300_000,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.globalErrorToast === false) return
      showApiErrorFlashMessage(error)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.globalErrorToast === false) return
      showApiErrorFlashMessage(error)
    },
  }),
})
