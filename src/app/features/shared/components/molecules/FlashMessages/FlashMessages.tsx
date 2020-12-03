import React from "react"
import { useLocation } from "@reach/router"

import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import { Alert } from "@amsterdam/asc-ui"
import { Column, Row } from "../../atoms/Grid"

const FlashMessages: React.FC = () => {
  const { pathname } = useLocation()
  const { state } = useFlashMessages()

  return (
    <Row>
      <Column>
        {state[pathname] && state[pathname].map((props, index) => <Alert key={index} {...props} />)}
        {state["current"] && state["current"].map((props, index) => <Alert key={index} {...props} />)}
      </Column>
    </Row>  
  )
}

export default FlashMessages
