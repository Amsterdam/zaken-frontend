import styled, { css } from "styled-components"
import { themeColor, themeSpacing } from "@datapunt/asc-ui"

type Props = {
  isFixed?: boolean
  minWidth?: number
}

const TableHeading = styled.th<Props>`     
  text-align: left;
  border-bottom: 1px solid ${ themeColor("tint", "level4") };
  padding: ${ themeSpacing(2) } ${ themeSpacing(3) };
    
  min-width: ${ props => props.minWidth ? `${ props.minWidth }px` : "auto" };  
    
  ${ props  => props.isFixed && css`  
      position: absolute;
      right: 0;
                
      width: ${ props.minWidth ? `${ props.minWidth }px` : "auto" } };
  ` }   
`

export default TableHeading
