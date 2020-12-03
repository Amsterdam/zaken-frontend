import React from "react"
import { useLocation } from "@reach/router"

import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import { Alert, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"

const StyledAlert = styled(Alert)`
  margin-bottom: ${ themeSpacing(5) }
`

const FlashMessages: React.FC = () => {
  const { pathname } = useLocation()
  const { state } = useFlashMessages()

  return (
    <>
      {state[pathname] && state[pathname].map((props, index) => <StyledAlert key={index} {...props} />)}
      {state["current"] && state["current"].map((props, index) => <StyledAlert key={index} {...props} />)}
    </>
  )
}

export default FlashMessages
