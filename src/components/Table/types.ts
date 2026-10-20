import { type ReactNode } from "react"

export type PaginationType = {
  page?: number
  pageSize?: number
  collectionSize?: number
  onPageChange?: (page: number) => void
}

export type ColumnType<T> = {
  header?: ReactNode
  /** A path in the row, e.g. "address.street_name". */
  dataIndex?: string
  minWidth?: number
  /** Keeps the value on one line (e.g. a date). */
  noWrap?: boolean
  /** Leaves the column out on a narrow window. */
  hideOnMobile?: boolean
  // The value's type depends on the path, so it is the caller's to narrow.
  render?: (value: unknown, record: T) => ReactNode
}

export type TableProps<T> = {
  columns: ColumnType<T>[]
  data?: T[]
  loading?: boolean
  numLoadingRows?: number
  emptyPlaceholder?: ReactNode
  /** `false` for a table without pages. */
  pagination?: false | PaginationType
  /**
   * Gives every row a button that opens more about it below the row (a click
   * on the row does the same).
   */
  expandable?: {
    expandedRow: (record: T) => ReactNode
    /** What the row is about, for the name of its button. */
    rowLabel?: (record: T) => string
  }
  /**
   * Where a cell's content sits in a row that is higher than one line (e.g. by
   * an avatar or a text over two lines). The design system's default is "top".
   */
  verticalAlign?: "top" | "middle"
  /** The user asked for another page. */
  onChange?: (pagination: PaginationType) => void
}
