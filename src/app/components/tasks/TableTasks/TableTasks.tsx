import { Table } from "@amsterdam/wonen-ui"
import { useUsersMe } from "app/state/rest/index"
import getColumns from "./columns"

type Props = {
  data?: Components.Schemas.CaseUserTask[]
  isBusy: boolean
  onChange: (pagination: any, sorting: any) => void
  pagination: TABLE.Schemas.Pagination | false
  sorting: TABLE.Schemas.Sorting
  emptyPlaceholder: string
  isEnforcement?: boolean
}

const TableTasks: React.FC<Props> = ({
  data, isBusy, onChange, pagination, sorting, emptyPlaceholder, isEnforcement
}) => {
  const [me] = useUsersMe()
  const columns = getColumns(sorting, me?.id, isEnforcement)

  return (
    <Table
      hasFixedColumn
      columns={ columns }
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
