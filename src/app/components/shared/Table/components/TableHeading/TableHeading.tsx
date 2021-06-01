import styled, { css } from "styled-components"
import { themeColor, themeSpacing } from "@amsterdam/asc-ui"

type Props = {
  isFixed?: boolean
  minWidth?: number
  width?: number
}

const TableHeading = styled.th<Props>`
  text-align: left;
  border-bottom: 1px solid ${ themeColor("tint", "level4") };
  padding: ${ themeSpacing(2) } ${ themeSpacing(3) };
  min-width: ${ ({ minWidth }) => minWidth ? `${ minWidth }px` : "auto" };
  width: ${ ({ width }) => width ? `${ width }px` : "auto" };
  white-space: nowrap;

  ${ ({ isFixed, minWidth }) => isFixed && css`
      position: absolute;
      right: 0;

      width: ${ minWidth ? `${ minWidth }px` : "auto" } };
  ` }
`

export default TableHeading
