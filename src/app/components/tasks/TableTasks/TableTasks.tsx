import { Table } from "@amsterdam/wonen-ui"
import { useUsersMe } from "app/state/rest/index"
import getColumns from "./columns"

type Props = {
  data?: Components.Schemas.CaseUserTaskList[]
  isBusy: boolean
}

const TableTasks: React.FC<Props> = ({ data, isBusy }) => {
  const [me] = useUsersMe()
  const columns = getColumns(me?.id)

  return (
    <Table
      hasFixedColumn
      columns={ columns }
      data={ data || [] }
      loading={ isBusy }
      numLoadingRows={ 10 }
      emptyPlaceholder="Er zijn momenteel geen open taken voor de gekozen filters"
    />
  )
}

export default TableTasks
