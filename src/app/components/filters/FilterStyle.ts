import styled from "styled-components"
import { Label, themeSpacing } from "@amsterdam/asc-ui"

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${ themeSpacing(5) };
`

export const StyledLabel = styled(Label)`
  line-height: 18px;
  font-size: 18px;
  font-weight: 600;
  width: 100%;

  span {
    margin: ${ themeSpacing(2) } 0;
    align-items: center;
    display: flex;
  }
`
