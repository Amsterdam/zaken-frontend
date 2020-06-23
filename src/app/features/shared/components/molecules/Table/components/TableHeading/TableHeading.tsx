import React from "react"
import styled, { css } from "styled-components"
import { themeColor, themeSpacing } from "@datapunt/asc-ui"

type Props = {
  fixedWidth?: string
}

const TableHeading = styled.th<Props>`  
  padding: ${ themeSpacing(4) } ${ themeSpacing(3) };
  
  text-align: left;
  border-bottom: 1px solid ${ themeColor("tint", "level5") };
  padding: ${ themeSpacing(2) } ${ themeSpacing(3) };  
  
  ${ ( { fixedWidth }: Props ) => fixedWidth && css`  
      position: absolute;
      right: 0;
                
      width: ${ fixedWidth };
  ` }   
`

export default TableHeading
