import React from "react"
import styled from "styled-components"
import { breakpoint, themeSpacing } from "@amsterdam/asc-ui"
import layouts from "@amsterdam/asc-ui/lib/theme/default/layouts"

import Column from "app/features/shared/components/atoms/Grid/Column"

/** Rows for page layout
 * optional props:
 *    - isFullWidth: by default the max-width of content is set to 1430px, overwrite this with 100% by setting the isFullWidth = true
 *    - marginBottom, marginTop: add vertical margins by use of the theme's spacing (this includes 'px')
 * Implementation :
 * <Row isFullWidth marginBottom={themeSpacing(10)} marginTop={themeSpacing(10)} >
 */

export type TypeProps = {
  children: React.ReactNode
  // TODO: Make both mobile and desktop spacing settable
  bottomSpacing?: number
}

const GUTTER = layouts.large.gutter

const RowStyle = styled.div<TypeProps>`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: calc(100% + ${ GUTTER } px);
  margin-left: -${ GUTTER / 2 }px;
  margin-right: -${ GUTTER / 2 }px;

  /* Column */
  > div {
    margin-bottom: ${ props => themeSpacing(props.bottomSpacing ?? 6) };
  }

  @media screen and ${ breakpoint("min-width", "laptop") } {
    width: calc(100% + ${ GUTTER }px);
    margin-left: -${ GUTTER / 2 }px;
    margin-right: -${ GUTTER  / 2 }px;

    /* Column */
    > div {
      margin-bottom: ${ props => themeSpacing(props.bottomSpacing ?? 12) };
    }
  }
`

export const RowWithColumn: React.FC<TypeProps> = ({ children, ...props }) => (
  <RowStyle { ...props }>
    <Column>
      { children }
    </Column>
  </RowStyle>
)
const Row: React.FC<TypeProps> = ({ children, ...props }) => (
  <RowStyle { ...props }>
    { children }
  </RowStyle>
)

export default Row
