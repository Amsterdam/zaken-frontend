import React from "react"
import styled, { css } from "styled-components"
import { themeColor, themeSpacing } from "@datapunt/asc-ui"

type Props = {
  fixedWidth?: string
}

const TableCell = styled.td<Props>`  
  padding: ${ themeSpacing(4) } ${ themeSpacing(3) };
  
  ${ ( { fixedWidth }: Props ) => fixedWidth && css`  
      position: absolute;
      right: 0;
      
      border-left: 2px solid ${ themeColor("tint", "level5") };
      
      width: ${ fixedWidth };
  ` }   
`

export default TableCell
