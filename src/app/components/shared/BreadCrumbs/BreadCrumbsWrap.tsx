
import styled from "styled-components"
import { breakpoint, themeSpacing } from "@amsterdam/asc-ui"
import { sizes } from "@amsterdam/asc-ui/lib/theme/default/breakpoints"
import BreadCrumbs from "./BreadCrumbs"

const Wrap = styled.div`
  max-width: ${ sizes.laptopL }px;
  margin: 0 auto;
  padding: ${ themeSpacing(3) };
  @media screen and ${ breakpoint("min-width", "laptopM") } {
    padding: ${ themeSpacing(3) } ${ themeSpacing(14) };
  }
`

const MainWrapper: React.FC = ({ children }) => (
  <Wrap>
    <BreadCrumbs />
  </Wrap>
)

export default MainWrapper
