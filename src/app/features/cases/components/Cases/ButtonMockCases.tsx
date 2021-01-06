import React from "react"
import { Button, themeColor } from "@amsterdam/asc-ui"
import styled from "styled-components"

const StyledButton = styled(Button)`
    position: fixed;
    bottom: 0;
    left: 0;
    border: 0;
    background-color: transparent;

    &:hover {
        outline: none;
        background-color: ${ themeColor("tint", "level2") };
    }
`

const ButtonMockCases: React.FC = () => {
  //const { execPost } = useMockCases({ lazy: true })
  const onClick = () => {
    throw new Error("Test Sentry") 
    //execPost()
  }

  return (
    <StyledButton onClick={ onClick } title="Genereer mock zaken" tabIndex={-1} />
  )
}
export default ButtonMockCases
