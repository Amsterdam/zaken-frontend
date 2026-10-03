import { Table } from "@/components/Table/Table"
import useMediaQuery from "app/hooks/useMediaQuery/useMediaQuery"
import columns from "./columns"
import createResponsiveColumns from "./createPrioritizedColumns"

type Props = {
  data?: components["schemas"]["CaseUserTask"][]
  isBusy: boolean
  numLoadingRows?: number
  onChange?: (pagination: TABLE.Schemas.Pagination) => void
  pagination: TABLE.Schemas.Pagination | false
  emptyPlaceholder: string
}

const TableTasks: React.FC<Props> = ({
  data,
  isBusy,
  numLoadingRows,
  onChange,
  pagination,
  emptyPlaceholder,
}) => {
  const { windowWidth } = useMediaQuery()

  const prioritizedColumns = createResponsiveColumns(columns, windowWidth)

  return (
    <Table
      columns={prioritizedColumns}
      data={data}
      loading={isBusy}
      numLoadingRows={numLoadingRows}
      onChange={onChange}
      pagination={pagination}
      emptyPlaceholder={emptyPlaceholder}
    />
  )
}

export default TableTasks
