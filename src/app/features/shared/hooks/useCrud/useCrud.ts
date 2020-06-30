import { useCallback } from "react"
import { navigate, useLocation } from "@reach/router"

import { useGlobalActions } from "app/state/state/globalState"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

type GlobalActions = ReturnType<typeof useGlobalActions>

type Config = {
  stateKey: keyof GlobalActions
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
  config: Config,
  action: "update" | "create" | "del",
  toDelete?: any // TODO can I type this? Or refactor to be able to use an id-string?
) => {
  const {
    redirectTo,
    stateKey,
    success: { title: successTitle, body: successBody },
    error: { title: errorTitle }
  } = config

  const { pathname } = useLocation()
  const globalActions = useGlobalActions()
  const { addSuccessFlashMessage, addErrorFlashMessage } = useFlashMessages()

  const handleAction = globalActions[stateKey][action]

  return useCallback(async (item?) => {
    try {
      // Actually call the action: (either, `update`, `create` or `del`)
      await handleAction(action === "del" ? toDelete : item)
      addSuccessFlashMessage(redirectTo, successTitle, successBody)
      return navigate(redirectTo)
    } catch(e) {
      console.error(`${ action } ${ config.stateKey } failed!`, e)
      // Something went wrong! Set flash message
      addErrorFlashMessage(pathname, errorTitle, e.detail)
    }
  }, [handleAction, action, toDelete, addSuccessFlashMessage, redirectTo, successTitle, successBody, config.stateKey, addErrorFlashMessage, pathname, errorTitle])
}

export const useCrudUpdate = (config: Config) => useCrud(config, "update")
export const useCrudCreate = (config: Config) => useCrud(config, "create")
export const useCrudDelete = (toDelete: any, config: Config) => useCrud(config, "del", toDelete)
