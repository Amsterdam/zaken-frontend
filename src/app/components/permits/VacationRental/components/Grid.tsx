import styled from "styled-components"
import { themeSpacing } from "@amsterdam/asc-ui"

export default styled.div`
  display: grid;
  grid-template-columns: minmax(140px, 1fr) 3fr;
  grid-gap: ${ themeSpacing(3) } ${ themeSpacing(4) };
  place-items: baseline start;
`