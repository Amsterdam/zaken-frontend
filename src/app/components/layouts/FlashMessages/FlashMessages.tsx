
import { useLocation } from "@reach/router"

import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import { Alert, themeSpacing } from "@amsterdam/asc-ui"
import { Column, Row } from "app/components/layouts/Grid"
import styled from "styled-components"

const StyledAlert = styled(Alert)`
  margin: ${ themeSpacing(12) } 0
`

const FlashMessages: React.FC = () => {
  const { pathname } = useLocation()
  const { state } = useFlashMessages()

  return (
    <Row bottomSpacing={ 0 }>
      <Column>
        {state[pathname] && state[pathname].map((props, index) => <StyledAlert key={index} {...props} />)}
        {state["current"] && state["current"].map((props, index) => <StyledAlert key={index} {...props} />)}
      </Column>
    </Row>
  )
}

export default FlashMessages
