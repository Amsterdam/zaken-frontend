import type { CSSProperties } from "react";
import styles from "./Column.module.css";

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

const Column: React.FC<TypeProps> = ({ children, spanSmall, spanLarge }) => {
  const style = {
    "--span-small": spanSmall ? `${spanSmall}%` : undefined,
    "--span-small-grow": spanSmall ? 0 : undefined,
    "--span-large": spanLarge ? `${spanLarge}%` : undefined,
    "--span-large-grow": spanLarge ? 0 : undefined,
  } as CSSProperties;

  return (
    <div className={styles.column} style={style}>
      { children }
    </div>
  );
};

export default Column;
