import { useCallback, useReducer } from "react"

export type ApiCache = {
  cache: Record<string, any>
  setItem: (key: string, value: any) => void
  clear: () => void
}

type State = Record<string, any>
type Action =
  | { type: "SET_ITEM", key: string, value: any }
  | { type: "CLEAR" }

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case "SET_ITEM":
      return { ...state, [action.key]: action.value }
    case "CLEAR":
      return {}
  }
}

export const useApiCache = (): ApiCache => {
  const [ cache, dispatch ] = useReducer(reducer, {})

  const setItem = useCallback((key: string, value: any) => dispatch({ type: "SET_ITEM", key, value }), [ dispatch ])
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), [ dispatch ])

  return { cache, setItem, clear }
}
