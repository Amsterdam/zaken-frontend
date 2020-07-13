import { useCallback } from "react"
import { navigate, useLocation } from "@reach/router"

import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

type Config = {
  action: (payload: {}) => Promise<any>
  redirectTo: string
  success: {
    title: string
    body: string
  }
  error: {
    title: string
  }
}

/**
 * - Calls a state action ("update", "create" or "del")
 * - Adds a flashMessage on either success or server-error
 * - Redirects on success.
 */
export const useCrud = (
  config: Config
) => {
  const {
    action,
    redirectTo,
    success: { title: successTitle, body: successBody },
    error: { title: errorTitle }
  } = config
  const { addSuccessFlashMessage, addErrorFlashMessage } = useFlashMessages()
  return useCallback(async (item?) => {
    try {
      // Actually call the action: (either, `update`, `create` or `del`)
      await action(item)
      addSuccessFlashMessage(redirectTo, successTitle, successBody)
      return navigate(redirectTo)
    } catch(e) {
      // Something went wrong! Set flash message
      addErrorFlashMessage(errorTitle, e.detail)
    }
  }, [action, addSuccessFlashMessage, redirectTo, successTitle, successBody, addErrorFlashMessage, errorTitle])
}
