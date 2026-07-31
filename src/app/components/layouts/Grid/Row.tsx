import type { CSSProperties } from "react";
import Column from "app/components/layouts/Grid/Column";
import styles from "./Row.module.css";

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
  topSpacing?: number
}

const getRowStyle = ({ bottomSpacing, topSpacing }: Omit<TypeProps, "children">): CSSProperties => ({
  "--bottom-spacing": bottomSpacing !== undefined ? `${bottomSpacing * 4}px` : undefined,
  "--top-spacing": topSpacing !== undefined ? `${topSpacing * 4}px` : undefined,
} as CSSProperties);

export const RowWithColumn: React.FC<TypeProps> = ({ children, ...props }) => (
  <div className={ styles.row } style={ getRowStyle(props) }>
    <Column>
      { children }
    </Column>
  </div>
);

const Row: React.FC<TypeProps> = ({ children, ...props }) => (
  <div className={ styles.row } style={ getRowStyle(props) }>
    { children }
  </div>
);

export default Row;
