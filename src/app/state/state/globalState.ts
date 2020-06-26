import { createGlobalState, ItemsState, ItemsActions } from "globalstate-hooks"

export type GlobalStateContext = {
  state: {
    cases: ItemsState<API.Case>
  }
  actions: {
    cases: ItemsActions<API.Case>
  }
}
const {
  GlobalStateContext,
  GlobalStateProvider,
  useGlobalState,
  useGlobalData,
  useGlobalActions
} = createGlobalState<GlobalStateContext>()
export { GlobalStateContext }
export { GlobalStateProvider }
export { useGlobalData }
export { useGlobalState }
export { useGlobalActions }
