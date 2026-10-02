import { useContext } from "react"
import { FlashMessageContext } from "./FlashMessageProvider"
export type { FlashMessageLevel } from "./hooks/useFlashMessagesReducer"

/**
 * A flash message is a message that is only shown once.
 * Once the message is shown on a route, and the user navigates away from that route, the message is cleared.
 * (The term "flash-message" comes from backend frameworks such as Django and Symfony).
 *
 * Example usage:
 * const { addSuccessFlashMessage } = useFlashMessages()
 *
 *
 * addSuccessFlashMessage("/zaken", "Succesvol verwijderd", "De zaak is succesvol verwijderd" })
 *
 */
export const useFlashMessages = () => {
  const context = useContext(FlashMessageContext)
  if (context === undefined) {
    throw new Error("Context was not set")
  }
  return context
}
