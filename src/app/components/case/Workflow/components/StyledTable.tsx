import { themeColor, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"

import Table from "app/components/shared/Table/Table"

export default styled(Table)`
  margin-bottom: ${ themeSpacing(5) };
  th {
    color: ${ themeColor("tint", "level4") };
  }
  td {
    padding: ${ themeSpacing(3) };
    line-height: 20px;
    vertical-align: middle;
    &:first-child {
      width: 32px;
    }
  }
`
