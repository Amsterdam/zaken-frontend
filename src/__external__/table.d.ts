const ASCEND = "ASCEND"
const DESCEND = "DESCEND"

type SortOrder = typeof ASCEND | typeof DESCEND

declare namespace TABLE {
  namespace Schemas {
    export type Pagination = {
      page?: number
      pageSize?: number
      collectionSize?: number
      paginationLength?: number
      onPageChange?: (page: number) => void
    }
    export type Sorting = {
      dataIndex?: string
      order?: SortOrder
    }
  }
}
