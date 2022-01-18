import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import getColumns from "./columns"

type Props = {
  data?: Components.Schemas.PaginatedCaseList
  isBusy: boolean
  onChange: (pagination: any, sorting: any) => void
  pagination: {
    page: number
    pageSize: number
    collectionSize: number
  }
  sorting: any
  emptyPlaceholder: string
}

const TableCases: React.FC<Props> = ({ data, isBusy, onChange, pagination, sorting, emptyPlaceholder }) => {

  const onClickRow = (data: any) => {
    navigateTo("/zaken/:id", { id: data.id })
  }

  const columns = getColumns(sorting)
  return (
    <Table
      hasFixedColumn
      loading={ isBusy }
      numLoadingRows={ 10 }
      columns={ columns }
      data={ data?.results || [] }
      onClickRow={ onClickRow }
      onChange={onChange}
      pagination={pagination}
      emptyPlaceholder={ emptyPlaceholder }
    />
  )
}

export default TableCases
