import { useFlashMessages, FlashMessageLevel } from "./useFlashMessages"
import to from "app/routing/utils/to"
import useNavigation from "app/routing/useNavigation"

export default () => {
  const { addSuccessFlashMessage, addErrorFlashMessage } = useFlashMessages()
  const { navigateTo } = useNavigation()
  return async (path: string, params?: Record<string, unknown>, level: FlashMessageLevel = "info", title = "", body = "") => {
    const p = to(path, params)
    const method = level === "error" ? addErrorFlashMessage : addSuccessFlashMessage
    method(p, title, body)
    navigateTo(p)
  }
}