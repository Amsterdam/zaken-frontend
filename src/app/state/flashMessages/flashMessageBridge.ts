import type { ReactNode } from "react"

type AddErrorFlashMessage = (title: string, body?: ReactNode) => void

/**
 * Lets code outside the React tree (e.g. the QueryClient's global error
 * handlers) show the same error flash message as useFlashMessages().
 * FlashMessageProvider registers itself here on mount.
 */
let addErrorFlashMessageImpl: AddErrorFlashMessage | null = null

export const registerFlashMessageBridge = (
  addErrorFlashMessage: AddErrorFlashMessage,
) => {
  addErrorFlashMessageImpl = addErrorFlashMessage
  return () => {
    if (addErrorFlashMessageImpl === addErrorFlashMessage) {
      addErrorFlashMessageImpl = null
    }
  }
}

export const addErrorFlashMessageOutsideReact: AddErrorFlashMessage = (
  title,
  body,
) => {
  addErrorFlashMessageImpl?.(title, body)
}
