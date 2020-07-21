import { useCallback } from "react"
import { AxiosError } from "axios"
import slashSandwich from "slash-sandwich"

import { useFlashMessages } from "../flashMessages/useFlashMessages"
import { getToken } from "../auth/tokenStore"

/**
 * Default error handler:
 */
export const useErrorHandler = () => {
  const { addErrorFlashMessage } = useFlashMessages()

  return useCallback((error: AxiosError) =>
      addErrorFlashMessage(
        "Oeps er ging iets mis!",
        `${ error?.response?.data?.detail ?? error.message } (URL: ${ error?.config?.url })`
      ),
    [addErrorFlashMessage]
  )
}

/**
 * Default headers:
 */
export const getHeaders = () => {
  const token = getToken()
  return { Authorization: `Bearer ${ token }` }
}

/**
 * Utility function to create a gateway URL.
 */
export const makeGatewayUrl = (...paths: Array<number|string>) =>
 slashSandwich([process.env.REACT_APP_GATEWAY, ...paths])
