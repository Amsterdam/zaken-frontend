import { createContext } from "react"
import type { ItemsState, ItemsActions } from "globalstate-hooks"

export type GlobalStateContext = {
  state: {
    cases: ItemsState<API.Case>
    caseTypes: ItemsState<API.CaseType>
  }
  actions: {
    cases: ItemsActions<API.Case>
    caseTypes: ItemsActions<API.CaseType>
  }
}
export default createContext<GlobalStateContext | undefined>(undefined)
