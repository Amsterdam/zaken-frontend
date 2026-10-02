import {
  ComponentProps,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from "react"
import { useLocation } from "react-router-dom"
import { produce } from "immer"
import { Alert } from "@amsterdam/asc-ui"

export type FlashMessage = ComponentProps<typeof Alert>
// messageId: a stable React key, so dismissing one message doesn't hide another.
export type StoredFlashMessage = FlashMessage & { messageId: number }
export type State = Record<string, StoredFlashMessage[]>
export type FlashMessageLevel = "info" | "error"

type Action =
  | { type: "add"; path: string; props: FlashMessage }
  | { type: "clear"; path: string }
  | { type: "remove"; path: string; messageId: number }

let nextId = 0

const isSameMessage = (a: FlashMessage, b: FlashMessage) =>
  a.level === b.level && a.title === b.title && a.children === b.children

export const reducer = produce((draft: State, action: Action) => {
  if (draft[action.path] === undefined) {
    draft[action.path] = []
  }
  switch (action.type) {
    case "add":
      // The same message twice (e.g. every failed poll attempt) adds nothing.
      if (
        draft[action.path].some((message) =>
          isSameMessage(message, action.props),
        )
      ) {
        break
      }
      draft[action.path].push({ ...action.props, messageId: nextId++ })
      break
    case "remove":
      draft[action.path] = draft[action.path].filter(
        ({ messageId }) => messageId !== action.messageId,
      )
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
    [dispatch],
  )

  const addSuccessFlashMessage = useCallback(
    (path: string, title: string, body?: ReactNode, shouldClear = false) => {
      if (shouldClear) {
        clearFlashMessages(path)
      }
      return dispatch({
        path,
        type: "add",
        props: { title, children: body, level: "info", dismissible: true },
      })
    },
    [dispatch, clearFlashMessages],
  )

  const removeFlashMessage = useCallback(
    (path: string, messageId: number) =>
      dispatch({ type: "remove", path, messageId }),
    [dispatch],
  )

  const addErrorFlashMessage = useCallback(
    (title: string, body?: ReactNode) =>
      dispatch({
        path: "current",
        type: "add",
        props: { title, children: body, level: "error", dismissible: true },
      }),
    [dispatch],
  )

  useEffect(() => {
    clearFlashMessages(pathname)
  }, [pathname, clearFlashMessages])

  return {
    state: state as State,
    addSuccessFlashMessage,
    addErrorFlashMessage,
    clearFlashMessages,
    removeFlashMessage,
  }
}
