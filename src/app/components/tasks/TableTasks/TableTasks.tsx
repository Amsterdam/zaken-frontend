import { DateDisplay } from "@amsterdam/wonen-ui"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import Table from "app/components/shared/Table/Table"
import navigateTo from "app/routing/navigateTo"
import to from "app/routing/utils/to"
import useValues from "./hooks/useValues"

type Props = {
  data?: Components.Schemas.CamundaTaskList[]
  isBusy: boolean
}

const sortAdress = (a: any, b: any) => a?.[0].localeCompare(b?.[0])
const sortTasks = (a: any, b: any) => a?.[1].localeCompare(b?.[1])
const sortDates = (a: any, b: any) => {
  // If there is no date, return -1 to put it at the end of the list.
  if (a?.[2] === undefined) return 1
  if (b?.[2] === undefined) return -1
  return new Date(a?.[2]).getTime() - new Date(b?.[2]).getTime()
}

const renderDate = (value: string | number | boolean | undefined | null | React.ReactNode) =>
  (value === undefined || typeof value === "string" ? <DateDisplay date={ value } emptyText="-" /> : "-") as React.ReactNode

const renderId = (value: string | number | boolean | undefined | null | React.ReactNode) =>
  typeof value === "string" ? <TableAction to={ to("/zaken/:id", { id: value }) }>Zaakdetails</TableAction> : undefined

const columns = [
  { header: "Adres", minWidth: 150, sorter: sortAdress },
  { header: "Open taak", minWidth: 100, sorter: sortTasks },
  { header: "Slotdatum", minWidth: 50, sorter: sortDates, render: renderDate },
  { minWidth: 140, render: renderId }
]

const TableTasks: React.FC<Props> = ({ data, isBusy }) => {

  const values = useValues(data)

  const onClickRow = (event: React.MouseEvent, index: number, data: Exclude<typeof values, undefined>[0]) => {
    const id = data[3]
    navigateTo("/zaken/:id", { id })
  }

  return (
    <Table
      hasFixedColumn
      columns={ columns }
      data={ values }
      loading={ isBusy }
      numLoadingRows={ 10 }
      onClickRow={ onClickRow }
      noValuesPlaceholder="Er zijn momenteel geen open taken voor de gekozen filters"
    />
  )
}

export default TableTasks
