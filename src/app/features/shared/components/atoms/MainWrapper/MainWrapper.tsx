import React from "react"
import styled from "styled-components"
import { breakpoint, themeSpacing } from "@datapunt/asc-ui"
import { sizes } from "@datapunt/asc-ui/lib/theme/default/breakpoints"

const Main = styled.main`
  box-sizing: border-box;
  margin: 0 auto;
  padding: ${ themeSpacing(6) } ${ themeSpacing(3) };
  width: 100%;
  max-width: ${ sizes.laptopL }px;

  @media screen and ${ breakpoint("min-width", "laptop") } {
    padding: ${ themeSpacing(12) } ${ themeSpacing(14) };
  }
`
const MainWrapper: React.FC = ({ children }) => (
  <Main>
    { children }
  </Main>
)

export default MainWrapper
