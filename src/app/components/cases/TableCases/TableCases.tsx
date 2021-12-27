import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import columns from "./columns"

type Props = {
  data?: Components.Schemas.PaginatedCaseList
  isBusy: boolean
  emptyPlaceholder: string
}

const TableCases: React.FC<Props> = ({ data, isBusy, emptyPlaceholder }) => {

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
      emptyPlaceholder={ emptyPlaceholder }
      pagination={ false }
    />
  )
}

export default TableCases
