import styled, { css } from "styled-components"
import { themeColor, themeSpacing } from "@amsterdam/asc-ui"

const TabButton = styled.button.attrs({
  role: "tab"
})<{ isSelected?: boolean }>`
  background-color: transparent;
  padding: ${ themeSpacing(3, 0) };
  color: ${ themeColor("tint", "level7") };
  border: none;
  margin-right: ${ themeSpacing(7) };
  transition: box-shadow 0.1s ease-in-out, color 0.1s ease-in-out;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 -2.5px ${ themeColor("secondary", "main") };
    color: ${ themeColor("secondary", "main") };
  }

  ${ ({ isSelected }) =>
    isSelected
    && css`
      color: ${ themeColor("tint", "level7") };
      box-shadow: inset 0 -2.5px ${ themeColor("tint", "level7") };

      &:hover {
        box-shadow: inset 0 -2.5px ${ themeColor("secondary", "main") };
        color: ${ themeColor("secondary", "main") };
      }
    ` }
`

export default TabButton
