import styled from 'styled-components';
import { breakpoint } from '@amsterdam/asc-ui';
import layouts from '@amsterdam/asc-ui/lib/theme/default/layouts';

/** Columns for page layout
 * optional props:
 *    - spanSmall: percentage for width of column used on screens with width < 1024
 *    - spanLarge: percentage for width of column used on screens with width > 1024
* Implementation :
 * <Column spanSmall={100} spanLarge={40}>
 */

export type TypeProps = {
  children: React.ReactNode
  spanSmall?: number
  spanLarge?: number
}

const GUTTER = layouts.large.gutter;

const ColumnStyle = styled.div<TypeProps>`
  flex:1;
  padding: 0 ${GUTTER / 2}px;
  max-width: 100%;
  flex-basis: ${(props) => (props.spanSmall ? `${props.spanSmall}%` : '100%')};
  flex-grow: ${(props) => (props.spanSmall ? 0 : 1)};
  @media screen and ${breakpoint('min-width', 'laptopM')} {
    padding: 0 ${GUTTER / 2}px;
    flex-basis: ${(props) => (props.spanLarge ? `${props.spanLarge}%` : '100%')};
    flex-grow: ${(props) => (props.spanLarge ? 0 : 1)};
  }
`;

const Column: React.FC<TypeProps> = ({ children, ...props }) => (
  <ColumnStyle {...props}>
    { children }
  </ColumnStyle>
);

export default Column;
