import { createContext, useReducer, useCallback } from "react"
import actions from "./actions"
import initialState, { StateType } from "./initialState"
import reducer from "./reducer"

// Context and Provider
export const ContextValues = createContext(initialState)

const ValueProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value: StateType = {
    ...state,
    updateContextState: useCallback((payload: any) => {
      dispatch({ type: actions.UPDATE_STATE, payload })
    }, [dispatch])
  }

  return (
    <ContextValues.Provider value={value}>
      {children}
    </ContextValues.Provider>
  )
}

export default ValueProvider
