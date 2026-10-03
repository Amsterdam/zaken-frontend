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
  /** The user asked for another page. */
  onChange?: (pagination: PaginationType) => void
}
