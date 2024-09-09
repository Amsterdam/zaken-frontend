import { ComponentProps, ReactNode, useCallback, useEffect, useReducer } from "react"
import { useLocation } from "react-router-dom"
import { produce } from "immer"
import { Alert } from "@amsterdam/asc-ui"

export type FlashMessage = ComponentProps<typeof Alert>
export type State = Record<string, FlashMessage[]>
export type FlashMessageLevel = "info" | "error"

type Action =
  | { type: "add", path: string, props: FlashMessage }
  | { type: "clear", path: string }

export const reducer = produce((draft, action: Action) => {
  if (draft[action.path] === undefined) {
    draft[action.path] = []
  }
  switch (action.type) {
    case "add":
      draft[action.path].push(action.props)
      break
    case "clear":
      delete draft[action.path]
      delete draft["current"]
      break
  }
})

export const useFlashMessagesReducer = () => {
  const [state, dispatch] = useReducer(reducer, {} as State)
  const { pathname } = useLocation()

  const clearFlashMessages = useCallback(
    (path: string) => dispatch({ type: "clear", path }),
    [dispatch]
  )

  const addSuccessFlashMessage = useCallback(
    (path: string, title: string, body?: ReactNode, shouldClear = false) => {
      if (shouldClear) {
        clearFlashMessages(path)
      }
      return dispatch({
        path,
        type: "add",
        props: { title, children: body, level: "info", dismissible: true }
      })
    },
    [dispatch, clearFlashMessages]
  )

  const addErrorFlashMessage = useCallback(
    (title: string, body?: ReactNode) => dispatch({
      path: "current",
      type: "add",
      props: { title, children: body, level: "error", dismissible: true }
    }),
    [dispatch]
  )

  useEffect(() => {
    clearFlashMessages(pathname)
  }, [ pathname, clearFlashMessages ])

  return {
    state: state as State,
    addSuccessFlashMessage,
    addErrorFlashMessage,
    clearFlashMessages
  }
}
