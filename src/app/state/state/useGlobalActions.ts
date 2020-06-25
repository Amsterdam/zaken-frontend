import { useContext } from "react"
import globalStateContext, { GlobalStateContext } from "./GlobalStateContext"

const useGlobalActions = () => {
  const { actions } = useContext(globalStateContext) as GlobalStateContext
  return actions
}

export default useGlobalActions
