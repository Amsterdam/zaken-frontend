import useValues from "./hooks/useValues"
import Table from "app/components/shared/Table/Table"
import { DateDisplay } from "@amsterdam/wonen-ui"

type Props = {
  data?: Components.Schemas.PaginatedCaseList
  isBusy: boolean
}

const sortAdress = (a: any, b: any) => a?.[0].localeCompare(b?.[0])
const sortStatus = (a: any, b: any) => a?.[1].localeCompare(b?.[1])
const sortDates = (a: any, b: any) => {
  // If there is no date, return -1 to put it at the end of the list.
  if (a?.[2] === undefined) return 1
  if (b?.[2] === undefined) return -1
  return new Date(a?.[2]).getTime() - new Date(b?.[2]).getTime()
}

const renderDate = (value: string | undefined) => <DateDisplay date={ value } emptyText="-" /> as React.ReactNode

const columns = [
  { header: "Adres", minWidth: 300, sorter: sortAdress },
  { header: "Status", minWidth: 100, sorter: sortStatus },
  { header: "Laatst gewijzigd", minWidth: 100, sorter: sortDates, render: renderDate },
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
