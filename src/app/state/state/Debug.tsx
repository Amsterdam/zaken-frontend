import React, { FC } from "react"
import { useGlobalState } from "./globalState"

const Debug: FC = () => {
  const state = useGlobalState()

  return (
    <pre>
      { JSON.stringify(state, null, "\t") }
    </pre>
  )
}
export default Debug
