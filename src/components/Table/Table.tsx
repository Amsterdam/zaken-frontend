import { Fragment, type ReactNode, useState } from "react"
import { Icon, Table as ADSTable } from "@amsterdam/design-system-react"
import { ChevronDownIcon } from "@amsterdam/design-system-react-icons"
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
  expandable,
  onChange,
}: TableProps<T>) {
  // The rows that are open, by their index on the page.
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (index: number) =>
    setExpandedRows((previous) => {
      const next = new Set(previous)
      if (!next.delete(index)) next.add(index)
      return next
    })

  const cellClassName = (column: {
    noWrap?: boolean
    hideOnMobile?: boolean
  }) =>
    [
      column.noWrap ? styles.noWrap : "",
      column.hideOnMobile ? styles.hideOnMobile : "",
    ]
      .join(" ")
      .trim() || undefined
  const numColumns = columns.length + (expandable ? 1 : 0)

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
                className={`${styles.headerCell} ${column.hideOnMobile ? styles.hideOnMobile : ""}`}
                style={{ minWidth: column.minWidth }}
              >
                {column.header}
              </ADSTable.HeaderCell>
            ))}
            {expandable && (
              <ADSTable.HeaderCell className={styles.expandCell}>
                Details
              </ADSTable.HeaderCell>
            )}
          </ADSTable.Row>
        </ADSTable.Header>
        <ADSTable.Body>
          {loading &&
            Array.from({ length: numLoadingRows }, (_, rowIndex) => (
              <ADSTable.Row key={rowIndex}>
                {columns.map((column, index) => (
                  <ADSTable.Cell key={index} className={cellClassName(column)}>
                    <div className={styles.loadingCell}>
                      <SmallSkeleton />
                    </div>
                  </ADSTable.Cell>
                ))}
                {expandable && <ADSTable.Cell />}
              </ADSTable.Row>
            ))}
          {!loading &&
            pageData.map((record, rowIndex) => {
              const isExpanded = expandedRows.has(rowIndex)
              return (
                <Fragment key={rowIndex}>
                  <ADSTable.Row
                    className={expandable ? styles.expandableRow : undefined}
                    onClick={expandable ? () => toggleRow(rowIndex) : undefined}
                  >
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
                          className={cellClassName(column)}
                        >
                          {column.render
                            ? column.render(value, record)
                            : ((value as ReactNode) ?? "")}
                        </ADSTable.Cell>
                      )
                    })}
                    {expandable && (
                      <ADSTable.Cell className={styles.expandCell}>
                        <button
                          type="button"
                          className={`${styles.expandButton} ${isExpanded ? styles.expandButtonOpen : ""}`}
                          aria-expanded={isExpanded}
                          aria-label={`Details${expandable.rowLabel ? ` van ${expandable.rowLabel(record)}` : ""}`}
                          onClick={(event) => {
                            // The row toggles as well.
                            event.stopPropagation()
                            toggleRow(rowIndex)
                          }}
                        >
                          <Icon svg={ChevronDownIcon} size="heading-3" />
                        </button>
                      </ADSTable.Cell>
                    )}
                  </ADSTable.Row>
                  {expandable && (
                    <ADSTable.Row className={styles.expandedRow}>
                      <ADSTable.Cell
                        colSpan={numColumns}
                        className={styles.expandedCell}
                      >
                        {/* Always there, so it can slide shut as well as open;
                            while shut it is hidden from everyone (CSS). */}
                        <div
                          className={`${styles.collapsible} ${isExpanded ? styles.collapsibleOpen : ""}`}
                          aria-hidden={!isExpanded}
                        >
                          <div className={styles.collapsibleInner}>
                            <div className={styles.expandedContent}>
                              {expandable.expandedRow(record)}
                            </div>
                          </div>
                        </div>
                      </ADSTable.Cell>
                    </ADSTable.Row>
                  )}
                </Fragment>
              )
            })}
          {!loading && isEmpty && (
            <ADSTable.Row>
              <ADSTable.Cell
                colSpan={numColumns}
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
