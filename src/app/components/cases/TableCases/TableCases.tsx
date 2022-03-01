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

const TableCases: React.FC<Props> = ({ data, isBusy, onChange, pagination, sorting, emptyPlaceholder }) => {
  console.log("useMediaQuery", useMediaQuery(1200))

  console.log("data", data)
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
      data={ data }
      onClickRow={ onClickRow }
      onChange={onChange}
      pagination={pagination}
      emptyPlaceholder={ emptyPlaceholder }
    />
  )
}

export default TableCases
