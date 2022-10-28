import { Table } from "@amsterdam/wonen-ui"
import { useUsersMe } from "app/state/rest"
import getColumns from "./columns"
import useMediaQuery from "app/hooks/useMediaQuery/useMediaQuery"
import createResponsiveColumns from "./createPrioritizedColumns"

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
  const { windowWidth } = useMediaQuery()

  const prioritizedColumns = createResponsiveColumns(columns, windowWidth)

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
