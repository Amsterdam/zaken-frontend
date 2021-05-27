
import styled from "styled-components"
import { breakpoint, themeSpacing } from "@amsterdam/asc-ui"
import BreadCrumbs from "./BreadCrumbs"

const Wrap = styled.div`
  padding: ${ themeSpacing(3) };
  @media screen and ${ breakpoint("min-width", "laptopM") } {
    padding: ${ themeSpacing(3) } ${ themeSpacing(12) };
  }
`

const MainWrapper: React.FC = ({ children }) => (
  <Wrap>
    <BreadCrumbs />
  </Wrap>
)

export default MainWrapper
