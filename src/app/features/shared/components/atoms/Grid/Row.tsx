import React from "react"
import styled from "styled-components"

import { breakpoint, themeSpacing } from "@datapunt/asc-ui" 
import Column from "./Column"


/**
 * optional props:
 *    - isFullWidth: by default the max-width of content is set to 1430px, overwrite this with 100% by setting the isFullWidth = true
 *    - marginBottom, marginTop: add vertical margins by use of the theme's spacing (this includes 'px')
 * For example:
 * <Row isFullWidth marginBottom={themeSpacing(10)} marginTop={themeSpacing(10)} >
 */

export type TypeProps = {
  children: React.ReactNode
  marginBottom?: any
  marginTop?: any
  addColumn?: boolean
}

const GUTTER = 6

const RowStyle = styled.div<TypeProps>`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: calc(100% + 2*${ themeSpacing(GUTTER / 2) });
  margin-left: -${ themeSpacing(GUTTER / 2) };
  margin-right: -${ themeSpacing(GUTTER / 2) };
  @media screen and ${ breakpoint("min-width", "laptop") } {
    width: calc(100% + 2*${ themeSpacing(GUTTER) });
    margin-left: -${ themeSpacing(GUTTER) };
    margin-right: -${ themeSpacing(GUTTER) };
  }
  margin-top: ${ props => props.marginTop || 0 };
  margin-bottom: ${ props => props.marginBottom || 0 };
`

export const RowWithColumn: React.FC<TypeProps> = ({ children, ...props }) => (
  <RowStyle { ...props } >  
      <Column>
         { children }
      </Column>
  </RowStyle>
)
const Row: React.FC<TypeProps> = ({ children, ...props }) => (
  <RowStyle { ...props } >  
    { children }
  </RowStyle>
)

export default Row
