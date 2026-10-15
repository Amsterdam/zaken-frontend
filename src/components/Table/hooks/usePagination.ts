import { useState } from "react"
import { type PaginationType } from "../types"

const DEFAULT_PAGE_SIZE = 10

/**
 * The pagination of the table: the `pagination` prop (paged from outside)
 * wins over the table's own page.
 */
const usePagination = (
  numRows: number,
  pagination: PaginationType | false | undefined,
) => {
  const [innerPage, setInnerPage] = useState(1)

  if (pagination === false) {
    return {
      page: 1,
      pageSize: undefined,
      collectionSize: numRows,
      setInnerPage,
    }
  }

  return {
    page: pagination?.page ?? innerPage,
    pageSize: pagination?.pageSize ?? DEFAULT_PAGE_SIZE,
    collectionSize: pagination?.collectionSize || numRows,
    setInnerPage,
  }
}

export default usePagination
