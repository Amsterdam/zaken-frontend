import React, { useCallback, useEffect, useReducer } from "react"
import { globalHistory, useLocation } from "@reach/router"
import produce from "immer"
import { Alert } from "amsterdam-react-final-form"

export type FlashMessage = React.ComponentProps<typeof Alert>
export type State = Record<string, FlashMessage[]>

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

///////////////////////////////////////////////////////////////////////////////////////////

export const useFlashMessagesReducer = () => {
  const [state, dispatch] = useReducer(reducer, {} as State)
  const { pathname } = useLocation()

  const clearFlashMessages = useCallback(
    (path: string) => dispatch({ type: "clear", path }),
    [dispatch]
  )

  const addSuccessFlashMessage = useCallback(
    (path: string, title: string, body?: React.ReactNode) => dispatch({
      path,
      type: "add",
      props: { title, children: body, variant: "success" }
    }),
    [dispatch]
  )

  const addErrorFlashMessage = useCallback(
    (title: string, body?: React.ReactNode) => dispatch({
      path: "current",
      type: "add",
      props: { title, children: body, variant: "error" }
    }),
    [dispatch]
  )

  useEffect(() => {
    const unListen = globalHistory.listen(() => clearFlashMessages(pathname))
    return () => { unListen() }
  }, [ pathname, clearFlashMessages ])

  return {
    state: state as State,
    addSuccessFlashMessage,
    addErrorFlashMessage,
    clearFlashMessages
  }
}
