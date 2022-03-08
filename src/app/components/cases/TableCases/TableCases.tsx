import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import getColumns from "./columns"
import useMediaQuery from "app/hooks/useMediaQuery/useMediaQuery"

type Props = {
  data: Components.Schemas.Case[]
  isBusy: boolean
  onChange: (pagination: any, sorting: any) => void
  pagination: TABLE.Schemas.Pagination
  sorting: TABLE.Schemas.Sorting
  emptyPlaceholder: string
}

const columnPriority = [
  "navigateId",
  "address.street_name",
  "address.postal_code",
  "start_date",
  "current_states",
  "reason.name",
  "last_updated",
  "id"
]

const TableCases: React.FC<Props> = ({ data, isBusy, onChange, pagination, sorting, emptyPlaceholder }) => {
  const { windowWidth } = useMediaQuery()

  const columns = getColumns(sorting)
  let prioritizedColumns = columns
  if (windowWidth < 900) {
    const prioArray = columnPriority.slice(0, 4)
    prioritizedColumns = columns.filter(col => prioArray.includes(col.dataIndex))
  } else if (windowWidth < 1400) {
    const prioArray = columnPriority.slice(0, 6)
    prioritizedColumns = columns.filter(col => prioArray.includes(col.dataIndex))
  }

  const onClickRow = (data: any) => {
    navigateTo("/zaken/:id", { id: data.id })
  }

  return (
    <Table
      hasFixedColumn
      loading={ isBusy }
      numLoadingRows={ 10 }
      columns={ prioritizedColumns }
      data={ data }
      onClickRow={ onClickRow }
      onChange={ onChange }
      pagination={{
        ...pagination,
        paginationLength: 9
      }}
      emptyPlaceholder={ emptyPlaceholder }
    />
  )
}

export default TableCases
