import React from "react"
import { useMockCases } from "app/state/rest"
import { Button, themeColor } from "@datapunt/asc-ui"
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
  const { execGet } = useMockCases({ lazy: true })
  const onClick = () => {
    (async () => {
      await execGet()
      window.location.reload()
    })()
  }

  return (
    <StyledButton onClick={ onClick } title="Genereer mock zaken" />
  )
}
export default ButtonMockCases
