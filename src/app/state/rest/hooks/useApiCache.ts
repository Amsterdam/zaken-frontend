import { useCallback, useReducer } from "react"

export type ApiCache = {
  getCacheItem: (key: string) => any
  setCacheItem: (key: string, value: any) => void
  clearCache: () => void
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

  const getCacheItem = useCallback((url: string) => cache[url], [ cache ])
  const setCacheItem = useCallback((key: string, value: any) => dispatch({ type: "SET_ITEM", key, value }), [ dispatch ])
  const clearCache = useCallback(() => dispatch({ type: "CLEAR" }), [ dispatch ])

  return { getCacheItem, setCacheItem, clearCache }
}
