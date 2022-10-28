import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import getColumns from "./columns"
import useMediaQuery from "app/hooks/useMediaQuery/useMediaQuery"
import createResponsiveColumns from "./createPrioritizedColumns"

type Props = {
  data: Components.Schemas.Case[]
  isBusy: boolean
  onChange: (pagination: any, sorting: any) => void
  pagination: TABLE.Schemas.Pagination
  sorting: TABLE.Schemas.Sorting
  emptyPlaceholder: string
}

const TableCases: React.FC<Props> = ({ data, isBusy, onChange, pagination, sorting, emptyPlaceholder }) => {
  const { windowWidth } = useMediaQuery()

  const columns = getColumns(sorting)
  const prioritizedColumns = createResponsiveColumns(columns, windowWidth)

  const onClickRow = (data: any) => {
    navigateTo("/zaken/:id", { id: data.id })
  }

  return (
    <Table
      lastColumnFixed
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
