import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"
import type { ApiError } from "@/api/types/apiError"
import { normalizeApiError } from "@/api/utils/normalizeApiError"
import { mapApiErrorToToast } from "@/api/utils/mapApiErrorToToast"
import { showToastOutsideReact } from "@/components/toasts/toastBridge"

/** Whether an error gets the global toast: never, or not for some errors. */
type GlobalErrorToast = boolean | ((error: ApiError) => boolean)

/**
 * Meta options queries/mutations can pass to opt out of the global error
 * toast, e.g. `useQuery({ ..., meta: { globalErrorToast: false } })`, or
 * `globalErrorToast: (error) => error.status !== 404` for one kind of error.
 * Use this when the error is already shown inline, so the user doesn't see
 * the same failure twice.
 */
declare module "@tanstack/react-query" {
  // Module augmentation only works with an interface.
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    queryMeta: {
      globalErrorToast?: GlobalErrorToast
    }
    mutationMeta: {
      globalErrorToast?: GlobalErrorToast
    }
  }
}

const wantsToast = (error: unknown, option: GlobalErrorToast = true) =>
  typeof option === "function" ? option(normalizeApiError(error)) : option

// How long a toast stays: the same error is not shown again in that time.
const TIME_SAME_ERROR = 4000
let lastError = { title: "", time: 0 }

/**
 * Shows an error of the API as a toast. Several requests that fail at once
 * (a page with more than one, or a request that is tried again) give one toast.
 */
export const showApiErrorToast = (error: unknown) => {
  const toast = mapApiErrorToToast(normalizeApiError(error))
  const now = Date.now()
  if (toast.title === lastError.title && now - lastError.time < TIME_SAME_ERROR)
    return
  lastError = { title: toast.title, time: now }
  showToastOutsideReact(toast)
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
      if (!wantsToast(error, query.meta?.globalErrorToast)) return
      showApiErrorToast(error)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (!wantsToast(error, mutation.meta?.globalErrorToast)) return
      showApiErrorToast(error)
    },
  }),
})
