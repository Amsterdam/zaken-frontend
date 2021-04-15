import { useFlashMessages } from "./useFlashMessages"
import to from "app/routing/utils/to"
import navigateTo from "app/routing/navigateTo"

type Level = "info" | "error"
export default () => {
  const { addSuccessFlashMessage, addErrorFlashMessage } = useFlashMessages()
  return async (path: string, params?: Record<string, unknown>, level: Level = "info", title = "", body = "") => {
    const p = to(path, params)
    const method = level === "error" ? addErrorFlashMessage : addSuccessFlashMessage
    method(p, title, body)
    navigateTo(p)
  }
}