import { type MouseEvent } from "react"
import { Pagination } from "@amsterdam/design-system-react"
import { type PaginationType } from "./types"
import styles from "./Table.module.css"

const PAGE_PARAM = "page"

const TablePagination = ({
  page = 1,
  pageSize = 10,
  collectionSize = 0,
  onPageChange,
}: PaginationType) => {
  // The design system renders links; the table changes the page without navigating.
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const link = (event.target as HTMLElement).closest("a")
    if (!link) return
    event.preventDefault()
    const targetPage = Number(
      new URL(link.href, window.location.href).searchParams.get(PAGE_PARAM),
    )
    if (targetPage > 0) onPageChange?.(targetPage)
  }

  return (
    <div className={styles.pagination} onClick={onClick}>
      <Pagination
        page={page}
        totalPages={Math.ceil(collectionSize / pageSize)}
        linkTemplate={(targetPage) => `?${PAGE_PARAM}=${targetPage}`}
      />
    </div>
  )
}

export default TablePagination
