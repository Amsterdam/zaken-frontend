import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import columns from "./columns"

type Props = {
  data?: Components.Schemas.PaginatedCaseList
  isBusy: boolean
  onChange: (pagination: any, sorting: any) => void
  pagination: {
    page: number
    pageSize: number
    collectionSize: number
  }
}

const TableCases: React.FC<Props> = ({ data, isBusy, onChange, pagination }) => {

  const onClickRow = (data: any) => {
    navigateTo("/zaken/:id", { id: data.id })
  }

  return (
    <Table
      hasFixedColumn
      loading={ isBusy }
      numLoadingRows={ 10 }
      columns={ columns }
      data={ data?.results || [] }
      onClickRow={ onClickRow }
      emptyPlaceholder="Er zijn momenteel geen open zaken voor de gekozen filters."
      onChange={onChange}
      pagination={pagination}
    />
  )
}

export default TableCases
