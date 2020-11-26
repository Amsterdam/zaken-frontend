import React from "react"
import styled from "styled-components"
import { themeColor, ascDefaultTheme } from "@datapunt/asc-ui"

type Props = {
  children: JSX.Element
}

type DivProps = {
  isProduction: boolean
}

// TODO: Remove theme call. Currently needed cause of a bug in ASC.
const Div = styled.div<DivProps>`
  border: ${ ({ isProduction }) => isProduction ? "none" : `solid 2px ${ themeColor("supplement", "pink")({ theme: ascDefaultTheme }) }` };
  padding: ${ ({ isProduction }) => isProduction ? 0 : "4px" };
  display: ${ ({ isProduction }) => isProduction ? "none" : "block" };
`

const MockWrapper: React.FC<Props> = ({ children }) => (
  <Div isProduction={ process.env.REACT_APP_ENVIRONMENT === "production" }>
    { children }
  </Div>
)
export default MockWrapper
