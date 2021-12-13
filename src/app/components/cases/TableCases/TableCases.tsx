import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import columns from "./columns"

type Props = {
  data?: Components.Schemas.PaginatedCaseList
  isBusy: boolean
}

const TableCases: React.FC<Props> = ({ data, isBusy }) => {

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
      emptyPlaceholder="Er zijn geen zaken voor deze dag"
      pagination={ false }
    />
  )
}

export default TableCases
