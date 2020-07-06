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
const useCrud = (
  config: Config
) => {
  const {
    action,
    redirectTo,
    success: { title: successTitle, body: successBody },
    error: { title: errorTitle }
  } = config

  const { pathname } = useLocation()
  const { addSuccessFlashMessage, addErrorFlashMessage } = useFlashMessages()

  const handleAction = action

  return useCallback(async (item?) => {
    try {
      // Actually call the action: (either, `update`, `create` or `del`)
      await handleAction(item)
      addSuccessFlashMessage(redirectTo, successTitle, successBody)
      return navigate(redirectTo)
    } catch(e) {
      // Something went wrong! Set flash message
      addErrorFlashMessage(pathname, errorTitle, e.detail)
    }
  }, [handleAction, addSuccessFlashMessage, redirectTo, successTitle, successBody, addErrorFlashMessage, pathname, errorTitle])
}

export const useCrudUpdate = (config: Config) => useCrud(config)
export const useCrudCreate = (config: Config) => useCrud(config)
export const useCrudDelete = (toDelete: any, config: Config) => useCrud(config)
