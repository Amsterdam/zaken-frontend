import React from "react"
import { useLocation } from "@reach/router"

import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
// TODO: Do not import this from amsterdam-react-final-form better from ASC
import Alert from "amsterdam-react-final-form/components/unbound/Alert"

const FlashMessages: React.FC = () => {
  const { pathname } = useLocation()
  const { state } = useFlashMessages()

  return (
    <>
      {state[pathname] && state[pathname].map((props, index) => <Alert key={index} {...props} />)}
      {state["current"] && state["current"].map((props, index) => <Alert key={index} {...props} />)}
    </>
  )
}

export default FlashMessages
