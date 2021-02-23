import { useCallback } from "react"
import { AxiosError } from "axios"

import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

/**
 * Default error handler:
 */
export const useErrorHandler = () => {
  const { addErrorFlashMessage } = useFlashMessages()

  return useCallback((error: AxiosError) =>
      addErrorFlashMessage(
        "Oeps er ging iets mis!",
        `${ error?.response?.data?.detail ?? error?.message ?? "-" } (URL: ${ error?.config?.url ?? "-" })`
      ),
    [addErrorFlashMessage]
  )
}

/**
 * Suppress error handler:
 */
export const useSuppressErrorHandler = () =>
  useCallback((error: AxiosError) => console.error(error), [])


