import styled, { css } from "styled-components"
import { themeColor, themeSpacing } from "@datapunt/asc-ui"

type Props = {
  fixedWidth?: string
}

const TableCell = styled.td<Props>`  
  padding: ${ themeSpacing(4) } ${ themeSpacing(3) };
  min-width:200px;
  height: 50px;
       
  ${ ( { fixedWidth }: Props ) => fixedWidth && css`  
      position: absolute;
      right: 0;
      
      border-left: 1px solid ${ themeColor("tint", "level3") };
      
      min-width: ${ fixedWidth };
      width: ${ fixedWidth };
  ` }   
`

export default TableCell
