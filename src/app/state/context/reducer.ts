import actions from './actions';

// Reducer to Handle Actions
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.UPDATE_CASES:
      return {
        ...state,
        cases: {
          ...state.cases,
          ...action.payload,
        },
      };
    case actions.UPDATE_TASKS:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
