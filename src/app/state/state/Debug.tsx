import React, { useEffect } from "react"
import { useGlobalState } from "./globalState"

type Props = {
  print?: boolean
}

const Debug: React.FC<Props> = ({ print = false }) => {
  const state = useGlobalState()

  useEffect(() => {
    (window as any).globalState = state
  }, [state])

  if (print === false) return null

  return (
    <pre>
      { JSON.stringify(state, null, "\t") }
    </pre>
  )
}
export default Debug
