import useValues from "./hooks/useValues"
import Table from "app/components/shared/Table/Table"
import { DateDisplay } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import to from "app/routing/utils/to"

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

const renderDate = (value: string | number | boolean | undefined | null | React.ReactNode) =>
  (value === undefined || typeof value === "string" ? <DateDisplay date={ value } emptyText="-" /> : "-") as React.ReactNode

const columns = [
  { header: "Adres", minWidth: 300, sorter: sortAdress },
  { header: "Status", minWidth: 100, sorter: sortStatus },
  { header: "Laatst gewijzigd", minWidth: 100, sorter: sortDates, render: renderDate },
  { minWidth: 140, render: (value: string | number | boolean | undefined | null | React.ReactNode) =>
    typeof value === "string" ? <TableAction to={ to("/zaken/:id", { id: value }) }>Zaakdetails</TableAction> : undefined
  }
]

const TableCases: React.FC<Props> = ({ data, isBusy }) => {

  const values = useValues(data?.results)

  const onClickRow = (event: React.MouseEvent, index: number, data: Exclude<typeof values, undefined>[0]) => {
    const id = data[3]
    navigateTo("/zaken/:id", { id })
  }

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
