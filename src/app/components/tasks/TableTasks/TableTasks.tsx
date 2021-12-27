import { Table } from "@amsterdam/wonen-ui"
import { useUsersMe } from "app/state/rest/index"
import getColumns from "./columns"

type Props = {
  data?: Components.Schemas.CaseUserTaskList[]
  isBusy: boolean
  emptyPlaceholder: string
}

const TableTasks: React.FC<Props> = ({ data, isBusy, emptyPlaceholder }) => {
  const [me] = useUsersMe()
  const columns = getColumns(me?.id)

  return (
    <Table
      hasFixedColumn
      columns={ columns }
      data={ data || [] }
      loading={ isBusy }
      numLoadingRows={ 10 }
      emptyPlaceholder={ emptyPlaceholder }
      pagination={ false }
    />
  )
}

export default TableTasks
