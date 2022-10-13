import styled, { css } from "styled-components"
import { Card, themeColor, themeSpacing  } from "@amsterdam/asc-ui"

type Props = {
  isVisible: boolean
  hasItems: boolean
}

const style = css<{ isVisible: boolean }>`
  display: flex;
  align-items: flex-start;
  max-height: 0px;
  overflow: auto;
  transition: max-height 300ms ease-out, padding 300ms ease-out, border-width 300ms ease-out;
  border: 0px solid ${ themeColor("tint", "level4") };
  max-height: ${ ({ isVisible }) => isVisible ? "200px" : "0px" };
  padding: ${ ({ isVisible }) => isVisible ? themeSpacing(2) : themeSpacing(0, 2) };
  border-width: ${ ({ isVisible }) => isVisible ? "1px" : "0px" };
`

const StyledCard = styled(Card)<{ isVisible: boolean }>`
  ${ style }
`

const StyledSpan = styled.span`
  padding: ${ themeSpacing(2) };
  font-style: italic;
`

const FilterCard: React.FC<Props> = ({ isVisible, hasItems, children }) => (
  <StyledCard isVisible={ isVisible }>
    { children }
    { !hasItems && <StyledSpan>Geen resultaten beschikbaar</StyledSpan> }
  </StyledCard>
)

export default FilterCard
