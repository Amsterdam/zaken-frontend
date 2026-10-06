import { Children, type ReactNode } from "react"
import { Row, type RowProps } from "@amsterdam/design-system-react"
import styles from "./EqualColumns.module.css"

type Props = {
  children: ReactNode
  gap?: RowProps["gap"]
}

/**
 * Its children next to each other in columns of the same width, and below each
 * other on a narrow window: an Amsterdam Design System Row that wraps.
 */
export function EqualColumns({ children, gap = "x-large" }: Props) {
  return (
    <Row wrap gap={gap} alignVertical="start">
      {Children.map(children, (child) => (
        <div className={styles.column}>{child}</div>
      ))}
    </Row>
  )
}
