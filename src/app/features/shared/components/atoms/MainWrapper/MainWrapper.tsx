import React from "react"
import styled from "styled-components"
import { breakpoint, themeSpacing } from "@datapunt/asc-ui"
import { sizes } from "@datapunt/asc-ui/lib/theme/default/breakpoints"

const MAX_WIDTH = sizes.laptopL

const LayoutContainer = styled.div`   
  box-sizing: border-box;
  margin: 0 auto;
  padding: ${ themeSpacing(3) };
  width: 100%;
  max-width: ${ MAX_WIDTH }px;

  @media screen and ${ breakpoint("min-width", "laptop") } {
    padding: ${ themeSpacing(3) } ${ themeSpacing(14) };
  }
`
const MainWrapper: React.FC = ({ children }) => (
   
    <main>
      <LayoutContainer>
        { children }
      </LayoutContainer>
    </main>
  
)

export default MainWrapper
