import { type ReactNode } from "react"
import { Table as ADSTable } from "@amsterdam/design-system-react"
import { SmallSkeleton } from "@/components/SmallSkeleton/SmallSkeleton"
import usePagination from "./hooks/usePagination"
import TablePagination from "./TablePagination"
import { type TableProps } from "./types"
import { getNestedValue } from "./utils"
import styles from "./Table.module.css"

/**
 * A table from columns and rows, with pagination and loading rows (after the
 * tables of zwd-frontend and top-frontend-v2, on the Amsterdam Design System
 * Table). Replaces the wonen-ui Table.
 *
 * A row is not clickable: put a link in a cell (keyboard, screen reader, new
 * tab). The rows are shown in the given order: sorting is done outside the table
 * (e.g. a "Sorteren op" select). Pagination works on the given rows; with
 * `pagination.collectionSize` the API pages and `onChange` asks for a page.
 */
export function Table<T extends object>({
  columns,
  data = [],
  loading = false,
  numLoadingRows = 5,
  emptyPlaceholder = "",
  pagination,
  verticalAlign = "top",
  onChange,
}: TableProps<T>) {
  const { page, pageSize, collectionSize, setInnerPage } = usePagination(
    data.length,
    pagination,
  )
  const paginationData = { page, pageSize, collectionSize }

  const onPageChange = (newPage: number) => {
    if (pagination) pagination.onPageChange?.(newPage)
    setInnerPage(newPage)
    onChange?.({ ...paginationData, page: newPage })
  }

  // With fewer rows than the collection, the rows are one page from the API.
  const isPagedOutside = data.length < collectionSize
  const pageData =
    pageSize === undefined || (isPagedOutside && data.length <= pageSize)
      ? data
      : data.slice((page - 1) * pageSize, page * pageSize)

  const isEmpty = data.length === 0

  return (
    <div className={styles.wrap}>
      <ADSTable
        className={`${styles.table} ${verticalAlign === "middle" ? styles.alignMiddle : ""}`}
      >
        <ADSTable.Header>
          <ADSTable.Row>
            {columns.map((column, index) => (
              <ADSTable.HeaderCell
                key={index}
                className={styles.headerCell}
                style={{ minWidth: column.minWidth }}
              >
                {column.header}
              </ADSTable.HeaderCell>
            ))}
          </ADSTable.Row>
        </ADSTable.Header>
        <ADSTable.Body>
          {loading &&
            Array.from({ length: numLoadingRows }, (_, rowIndex) => (
              <ADSTable.Row key={rowIndex}>
                {columns.map((_column, index) => (
                  <ADSTable.Cell key={index}>
                    <div className={styles.loadingCell}>
                      <SmallSkeleton />
                    </div>
                  </ADSTable.Cell>
                ))}
              </ADSTable.Row>
            ))}
          {!loading &&
            pageData.map((record, rowIndex) => (
              <ADSTable.Row key={rowIndex}>
                {columns.map((column, index) => {
                  const value = column.dataIndex
                    ? getNestedValue(
                        record as Record<string, unknown>,
                        column.dataIndex,
                      )
                    : undefined
                  return (
                    <ADSTable.Cell
                      key={index}
                      className={column.noWrap ? styles.noWrap : undefined}
                    >
                      {column.render
                        ? column.render(value, record)
                        : ((value as ReactNode) ?? "")}
                    </ADSTable.Cell>
                  )
                })}
              </ADSTable.Row>
            ))}
          {!loading && isEmpty && (
            <ADSTable.Row>
              <ADSTable.Cell
                colSpan={columns.length}
                className={styles.emptyPlaceholder}
              >
                {emptyPlaceholder}
              </ADSTable.Cell>
            </ADSTable.Row>
          )}
        </ADSTable.Body>
      </ADSTable>
      {pagination !== false && !isEmpty && (
        <TablePagination {...paginationData} onPageChange={onPageChange} />
      )}
    </div>
  )
}

export default Table
