import styled from "styled-components"
import { breakpoint, themeSpacing } from "@datapunt/asc-ui"

// TODO introduce a Spacing component?
export const MainWrapper = styled.div`   
  margin: ${ themeSpacing(3) };
  @media screen and ${ breakpoint("min-width", "laptop") } {
    margin: ${ themeSpacing(10) };
  }
`
