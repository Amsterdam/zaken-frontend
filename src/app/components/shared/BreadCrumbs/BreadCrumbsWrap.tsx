
import styled from "styled-components"
import { themeSpacing } from "@amsterdam/asc-ui"
import { sizes } from "@amsterdam/asc-ui/lib/theme/default/breakpoints"
import BreadCrumbs from "./BreadCrumbs"

const BreadCrumbsWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  max-width: ${ sizes.laptopL }px;
  margin: 0 auto ${ themeSpacing(9) };
  padding: ${ themeSpacing(3) } ${ themeSpacing(12) };
`
const MainWrapper: React.FC = ({ children }) => (
  <BreadCrumbsWrap>
    <BreadCrumbs />
  </BreadCrumbsWrap>
)

export default MainWrapper
