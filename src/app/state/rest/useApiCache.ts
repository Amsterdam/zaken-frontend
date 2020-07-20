import { useCallback, useReducer } from "react"

export type ApiCache = {
  getCacheItem: (group: string, url: string) => any
  setCacheItem: (key: string, group: string, value: any) => void
  clearCache: (group: string) => void
}

type State = Record<string, any>
type Action =
  | { type: "SET_ITEM", key: string, group: string, value: any }
  | { type: "CLEAR", group: string }

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case "SET_ITEM":
      return { ...state, [`${ action.group }__${ action.key }`]: action.value }
    case "CLEAR":
      return Object.entries(state)
        .filter(([key]) => !key.startsWith(action.group))
        .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})
  }
}

export const useApiCache = (): ApiCache => {
  const [ cache, dispatch ] = useReducer(reducer, {})

  const getCacheItem = useCallback((group: string, url: string) => cache[`${ group }__${ url }`], [ cache ])
  const setCacheItem = useCallback((group: string, key: string, value: any) => dispatch({ type: "SET_ITEM", group, key, value }), [ dispatch ])
  const clearCache = useCallback((group: string) => dispatch({ type: "CLEAR", group }), [ dispatch ])

  return { getCacheItem, setCacheItem, clearCache }
}
