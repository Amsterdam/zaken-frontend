import { createContext, useReducer, useCallback, type ReactNode } from "react";
import actions from "./actions";
import initialState, { StateType } from "./initialState";
import reducer from "./reducer";

// Context and Provider
export const ContextValues = createContext(initialState);

const ValueProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: StateType = {
    cases: {
      ...state.cases,
      updateContextCases: useCallback((payload: any) => {
        dispatch({ type: actions.UPDATE_CASES, payload });
      }, [dispatch]),
    },
    tasks: {
      ...state.tasks,
      updateContextTasks: useCallback((payload: any) => {
        dispatch({ type: actions.UPDATE_TASKS, payload });
      }, [dispatch]),
    },
  };

  return (
    <ContextValues.Provider value={ value }>
      {children}
    </ContextValues.Provider>
  );
};

export default ValueProvider;
