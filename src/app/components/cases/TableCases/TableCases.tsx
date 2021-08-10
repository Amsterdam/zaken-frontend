import useValues from "./hooks/useValues"
import Table from "app/components/shared/Table/Table"

type Props = {
  data?: Components.Schemas.PaginatedCaseList
  isBusy: boolean
}

const sortAdress = (a: any, b: any) => a?.itemList[0].localeCompare(b?.itemList[0])
const sortStatus = (a: any, b: any) => a?.itemList[1].localeCompare(b?.itemList[1])
const sortDates = (a: any, b: any) => {
  // If there is no date, return -1 to put it at the end of the list.
  if (a?.itemList[2]?.props?.date === undefined) {
    return 1
  }
  if (b?.itemList[2]?.props?.date === undefined) {
    return -1
  }
  return new Date(a?.itemList[2]?.props?.date).getTime() - new Date(b?.itemList[2]?.props?.date).getTime()
}

const columns = [
  { header: "Adres", minWidth: 300, sorter: sortAdress },
  { header: "Status", minWidth: 100, sorter: sortStatus },
  { header: "Laatst gewijzigd", minWidth: 100, sorter: sortDates },
  { minWidth: 140 }
]

const TableCases: React.FC<Props> = ({ data, isBusy }) => {

  const [values, onClickRow] = useValues(data?.results)

  return (
    <Table
      hasFixedColumn
      loading={ isBusy }
      numLoadingRows={ 10 }
      columns={ columns }
      data={ values }
      onClickRow={ onClickRow }
      noValuesPlaceholder="Er zijn geen zaken voor deze dag"
    />
  )
}

export default TableCases
