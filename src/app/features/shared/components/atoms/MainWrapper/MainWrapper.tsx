import React from "react"
import styled from "styled-components"
import { breakpoint, themeSpacing } from "@datapunt/asc-ui"
import { sizes } from "@datapunt/asc-ui/lib/theme/default/breakpoints"

const MAX_WIDTH = sizes.laptopL

// TODO introduce a Spacing component?
const MainWrapperStyle = styled.main`
  margin: ${ themeSpacing(3) };
  @media screen and ${ breakpoint("min-width", "laptop") } {
    margin: ${ themeSpacing(10) };
  }
`
const LayoutContainer = styled.div`   
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  max-width: ${ MAX_WIDTH }px;
`
const MainWrapper: React.FC = ({ children }) => (
   
    <MainWrapperStyle>
      <LayoutContainer>
        { children }
      </LayoutContainer>
    </MainWrapperStyle>
  
)

export default MainWrapper
