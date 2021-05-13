import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

export default styled.label`
  color: ${ themeColor("tint", "level5") };
  font-weight: 500;
  word-break: break-word;
`