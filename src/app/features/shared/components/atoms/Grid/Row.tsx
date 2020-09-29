import React from "react"
import styled from "styled-components"


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
  isFullWidth?: boolean
}

const MAX_WIDTH = 1430

const RowStyle = styled.div<TypeProps>`
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: ${ ({ isFullWidth } ) => isFullWidth ? "100%" : `${ MAX_WIDTH }px` };
  margin-top: ${ props => props.marginTop || 0 };
  margin-bottom: ${ props => props.marginBottom || 0 };

`

const Row: React.FC<TypeProps> = ({ children, ...props }) => (
  <RowStyle { ...props } >    
    {children}
  </RowStyle>
)

export default Row
