import React from "react"
import styled from "styled-components"
import { themeColor } from "@datapunt/asc-ui"

type Props = {
  children: JSX.Element
}

type DivProps = {
  environment?: string
}
const Div = styled.div<DivProps>`
  background: ${ ({ environment }) => environment !== "production" ? themeColor("supplement", "pink") : "transparent" };
  display: ${ ({ environment }) => environment === "production" ? "none" : "block" };
`

const MockWrapper: React.FC<Props> = ({ children }) => (
    <Div environment={ process.env.REACT_APP_ENVIRONMENT }>
      { children }
    </Div>
  )
export default MockWrapper
