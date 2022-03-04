import actions from "./actions"

// Reducer to Handle Actions
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.UPDATE_STATE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default reducer
