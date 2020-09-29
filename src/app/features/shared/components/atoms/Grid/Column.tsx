import React from "react"
import styled from "styled-components"
import { breakpoint, themeSpacing } from "@datapunt/asc-ui"


/**
 * optional props:
 * 
 */

export type TypeProps = {
  children: React.ReactNode
  spanSmall?: number
  spanLarge?: number
}

const GUTTER = 6

const ColumnStyle = styled.div<TypeProps>`
  flex:1;
  padding: 0 ${ themeSpacing(GUTTER / 2) };
  max-width: 100%;
  flex-basis: ${ props => `${ props.spanSmall }%` || "100%" };
  flex-grow: ${ props => props.spanSmall  !== undefined ? 0 : 1 };
  @media screen and ${ breakpoint("min-width", "laptop") } {
    padding: 0 ${ themeSpacing(GUTTER) };
    flex-basis: ${ props => `${ props.spanLarge }%` || "100%" };
    flex-grow: ${ props => props.spanLarge  !== undefined ? 0 : 1 };
  }
`

const Column: React.FC<TypeProps> = ({ children, ...props }) => (
  <ColumnStyle { ...props } >    
    {children}
  </ColumnStyle>
)

export default Column
