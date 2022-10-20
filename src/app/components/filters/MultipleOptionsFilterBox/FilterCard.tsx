import styled from "styled-components"
import { Card, themeColor, themeSpacing  } from "@amsterdam/asc-ui"

type Props = {
  isVisible: boolean
  hasItems: boolean
}

const StyledCard = styled(Card)<{ isVisible: boolean }>`
  display: flex;
  align-items: flex-start;
  max-height: 0;
  overflow: auto;
  transition: max-height 300ms ease-out, padding 300ms ease-out, border-width 300ms ease-out;
  border: 0 solid ${ themeColor("tint", "level4") };
  max-height: ${ ({ isVisible }) => isVisible ? "200px" : 0 };
  padding: ${ ({ isVisible }) => isVisible ? themeSpacing(2) : themeSpacing(0, 2) };
  border-width: ${ ({ isVisible }) => isVisible ? "1px" : 0 };
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
