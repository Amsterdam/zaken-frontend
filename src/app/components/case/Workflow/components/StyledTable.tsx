import { themeColor, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"

import Table from "app/components/shared/Table/Table"

export default styled(Table)`
  margin-bottom: ${ themeSpacing(5) };
  th {
    color: ${ themeColor("tint", "level4") };
  }
  td {
    line-height: ${ themeSpacing(12) };
    padding: ${ themeSpacing(1) } ${ themeSpacing(3) };

    &:first-child {
      width: 32px;
    }
  }
`
