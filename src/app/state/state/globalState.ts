import { createGlobalState, ItemsState, ItemsActions } from "globalstate-hooks"

export type GlobalStateContext = {
  state: {
    cases: ItemsState<API.Case>
    caseTypes: ItemsState<API.CaseType>
    caseStatuses: ItemsState<API.State>
  }
  actions: {
    cases: ItemsActions<API.Case>
    caseTypes: ItemsActions<API.CaseType>
    caseStatuses: ItemsActions<API.State>
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
