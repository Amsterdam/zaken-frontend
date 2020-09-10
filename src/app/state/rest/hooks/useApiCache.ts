import { useCallback, useReducer } from "react"
import produce from "immer"

export type ApiCacheItem = {
  valid: boolean
  value: any
}

export type ApiCache = {
  getCacheItem: (key: string) => ApiCacheItem
  setCacheItem: (key: string, value: any) => void
  updateCacheItem: (key: string, updater: (item: any) => void) => void
  clearCache: () => void
}

type State = Record<string, ApiCacheItem>
type Action =
  | { type: "UPDATE_ITEM", key: string, updater: (item: any) => void }
  | { type: "SET_ITEM", key: string, value: any }
  | { type: "CLEAR" }

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case "UPDATE_ITEM":
      const value = produce(state[action.key].value, action.updater)
      return {
        ...state,
        [action.key]: { valid: true, value }
      }
    case "SET_ITEM":
      return {
        ...state,
        [action.key]: { valid: true, value: action.value }
      }
    case "CLEAR":
      return Object
        .entries(state)
        .reduce((acc, [key, val]) => ({
          ...acc,
          [key]: { valid: false, value: val.value }
        }), {})
  }
}

export const useApiCache = (): ApiCache => {
  const [ cache, dispatch ] = useReducer(reducer, {})

  const getCacheItem = useCallback((key: string) => cache[key], [ cache ])
  const setCacheItem = useCallback((key: string, value: any) => dispatch({ type: "SET_ITEM", key, value }), [ dispatch ])
  const updateCacheItem = useCallback((key: string, updater: (cache: any) => void) => dispatch({ type: "UPDATE_ITEM", key, updater }), [ dispatch ])
  const clearCache = useCallback(() => dispatch({ type: "CLEAR" }), [ dispatch ])

  return { getCacheItem, setCacheItem, updateCacheItem, clearCache }
}
