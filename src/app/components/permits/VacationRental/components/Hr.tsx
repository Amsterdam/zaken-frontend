import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

export default styled.hr`
  margin: 0;
  border: 0;
  height: 1px;
  background: ${ themeColor("tint", "level4") };
`