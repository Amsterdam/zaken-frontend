import { useCallback, useReducer } from "react";
import { produce } from "immer";

export type ApiCacheItem = {
  valid: boolean
  value: any
  errors: any[]
}

export type ApiCache = {
  getCacheItem: (key: string) => ApiCacheItem
  setCacheItem: (key: string, value: any) => void
  updateCacheItem: (key: string, updater: (item: any) => void) => void
  addErrorToCacheItem: (key: string, error: any) => void
  clearCache: () => void
  /**
   * Marks only the items whose key (url) starts with keyPrefix as invalid. Temporary,
   * for targeted invalidation from migrated TanStack mutations (see MIGRATION.md Fase 1).
   */
  invalidateCacheItems: (keyPrefix: string) => void
}

type State = Record<string, ApiCacheItem>
type Action =
  | { type: "UPDATE_ITEM", key: string, updater: (item: any) => void }
  | { type: "SET_ITEM", key: string, value: any }
  | { type: "ADD_ERROR", key: string, error: any }
  | { type: "CLEAR" }
  | { type: "INVALIDATE_PREFIX", keyPrefix: string }

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case "UPDATE_ITEM": {
      const item = state[action.key];
      const value = produce(item.value, action.updater);
      return {
        ...state,
        [action.key]: { ...item, valid: true, value },
      };
    }
    case "SET_ITEM": {
      return {
        ...state,
        [action.key]: { valid: true, value: action.value, errors: [] },
      };
    }
    case "ADD_ERROR": {
      const item = state[action.key] ?? { valid: true, value: undefined, errors: [] };
      const errors = [...item.errors, action.error];
      return {
        ...state,
        [action.key]: { ...item, errors },
      };
    }
    case "INVALIDATE_PREFIX": {
      return Object
        .entries(state)
        .reduce((acc, [key, val]) => ({
          ...acc,
          [key]: key.startsWith(action.keyPrefix) ? { valid: false, value: val.value, errors: [] } : val,
        }), {} as State);
    }
    case "CLEAR": {
      return Object
        .entries(state)
        .reduce((acc, [key, val]) => ({
          ...acc,
          [key]: { valid: false, value: val.value, errors: [] },
        }), {} as State);
    }
  }
};

export const useApiCache = () => {
  const [ cache, dispatch ] = useReducer(reducer, {} as State);

  const getCacheItem = useCallback((key: string) => cache[key], [ cache ]);
  const setCacheItem = useCallback((key: string, value: any) => dispatch({ type: "SET_ITEM", key, value }), [ dispatch ]);
  const updateCacheItem = useCallback((key: string, updater: (cache: any) => void) => dispatch({ type: "UPDATE_ITEM", key, updater }), [ dispatch ]);
  const addErrorToCacheItem = useCallback((key: string, error: any) => dispatch({ type: "ADD_ERROR", key, error }), [ dispatch ]);
  const clearCache = useCallback(() => dispatch({ type: "CLEAR" }), [ dispatch ]);
  const invalidateCacheItems = useCallback((keyPrefix: string) => dispatch({ type: "INVALIDATE_PREFIX", keyPrefix }), [ dispatch ]);

  return { getCacheItem, setCacheItem, updateCacheItem, addErrorToCacheItem, clearCache, invalidateCacheItems };
};
