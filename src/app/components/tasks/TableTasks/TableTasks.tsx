import { Table } from "@amsterdam/wonen-ui"
import { useUsersMe } from "app/state/rest"
import getColumns from "./columns"
import useMediaQuery from "app/hooks/useMediaQuery/useMediaQuery"

type Props = {
  data?: Components.Schemas.CaseUserTask[]
  isBusy: boolean
  onChange: (pagination: any, sorting: any) => void
  pagination: TABLE.Schemas.Pagination | false
  sorting: TABLE.Schemas.Sorting
  emptyPlaceholder: string
  isEnforcement?: boolean
}

const columnPriority = [
  "case.id",
  "case.address.street_name",
  "name",
  "owner",
  "case.address.postal_code",
  "due_date",
  "case.start_date"
]

const TableTasks: React.FC<Props> = ({
  data, isBusy, onChange, pagination, sorting, emptyPlaceholder, isEnforcement
}) => {
  const [me] = useUsersMe()
  const columns = getColumns(sorting, me?.id, isEnforcement)
  const { windowWidth } = useMediaQuery()

  let prioritizedColumns = columns
  if (windowWidth < 900) {
    const prioArray = columnPriority.slice(0, 4)
    prioritizedColumns = columns.filter(col => prioArray.includes(col.dataIndex))
  } else if (windowWidth < 1600) {
    const prioArray = columnPriority.slice(0, 6)
    prioritizedColumns = columns.filter(col => prioArray.includes(col.dataIndex))
  }

  return (
    <Table
      lastColumnFixed
      columns={ prioritizedColumns }
      data={ data }
      loading={ isBusy }
      numLoadingRows={ 10 }
      onChange={ onChange }
      pagination={pagination}
      emptyPlaceholder={ emptyPlaceholder }
    />
  )
}

export default TableTasks
