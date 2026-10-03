import { Table } from "@/components/Table/Table"
import columns from "./columns"
import useMediaQuery from "app/hooks/useMediaQuery/useMediaQuery"
import createResponsiveColumns from "./createPrioritizedColumns"

type Props = {
  data: components["schemas"]["Case"][]
  isBusy: boolean
  onChange: (pagination: TABLE.Schemas.Pagination) => void
  pagination: TABLE.Schemas.Pagination
  emptyPlaceholder: string
}

const TableCases: React.FC<Props> = ({
  data,
  isBusy,
  onChange,
  pagination,
  emptyPlaceholder,
}) => {
  const { windowWidth } = useMediaQuery()

  const prioritizedColumns = createResponsiveColumns(columns, windowWidth)

  return (
    <Table
      loading={isBusy}
      // As many as a page has, so the table keeps its height while loading.
      numLoadingRows={pagination.pageSize}
      columns={prioritizedColumns}
      data={data}
      onChange={onChange}
      pagination={pagination}
      emptyPlaceholder={emptyPlaceholder}
      // Like the tasks overview.
      verticalAlign="middle"
    />
  )
}

export default TableCases
