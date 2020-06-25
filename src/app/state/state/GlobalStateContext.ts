import { createContext } from "react"
import type { ItemsState, ItemsActions } from "globalstate-hooks"

export type GlobalStateContext = {
  state: {
    cases: ItemsState<API.Case>
  }
  actions: {
    cases: ItemsActions<API.Case>
  }
}
export default createContext<GlobalStateContext | undefined>(undefined)
