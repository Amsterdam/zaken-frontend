import { useContext } from "react"
import globalStateContext, { GlobalStateContext } from "./GlobalStateContext"

const useGlobalData = (key: keyof GlobalStateContext["state"]) => {
  const { state } = useContext(globalStateContext) as GlobalStateContext
  return state[key].data
}

export default useGlobalData
