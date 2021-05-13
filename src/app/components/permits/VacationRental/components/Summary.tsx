import styled from "styled-components"
import { themeColor, themeSpacing } from "@amsterdam/asc-ui"

export default styled.summary`
  color: ${ themeColor("primary") };
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  details[open] > & {
    margin-bottom: ${ themeSpacing(4) };
  }
`

