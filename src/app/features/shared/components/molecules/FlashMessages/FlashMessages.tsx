import React from "react"
import { useLocation } from "@reach/router"

import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import Alert from "amsterdam-react-final-form/components/unbound/Alert"

const FlashMessages: React.FC = () => {
  const { pathname } = useLocation()
  const { state } = useFlashMessages()

  return (
    <>
      {state[pathname] && state[pathname].map((props, index) => <Alert key={index} {...props} />)}
    </>
  )
}

export default FlashMessages
