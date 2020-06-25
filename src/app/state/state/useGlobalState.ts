import { useContext } from "react"
import globalStateContext, { GlobalStateContext } from "./GlobalStateContext"

const useGlobalState = () => {
  const { state } = useContext(globalStateContext) as GlobalStateContext
  return state
}

export default useGlobalState
