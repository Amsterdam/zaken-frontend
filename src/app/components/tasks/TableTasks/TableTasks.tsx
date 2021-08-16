import { DateDisplay } from "@amsterdam/wonen-ui"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import Table from "app/components/shared/Table/Table"
import navigateTo from "app/routing/navigateTo"
import to from "app/routing/utils/to"
import useValues from "./hooks/useValues"
import { sortStrings, sortDates } from "app/components/shared/Table/utils/sorters"

type Props = {
  data?: Components.Schemas.CamundaTaskList[]
  isBusy: boolean
}

const renderDate = (value: string | number | boolean | undefined | null | React.ReactNode) =>
  (value === undefined || typeof value === "string" ? <DateDisplay date={ value } emptyText="-" /> : "-") as React.ReactNode

const renderId = (value: string | number | boolean | undefined | null | React.ReactNode) =>
  typeof value === "string" ? <TableAction to={ to("/zaken/:id", { id: value }) }>Zaakdetails</TableAction> : undefined

const columns = [
  { header: "Adres", minWidth: 150, sorter: sortStrings },
  { header: "Open taak", minWidth: 100, sorter: sortStrings },
  { header: "Slotdatum", minWidth: 50, sorter: sortDates, render: renderDate, defaultSorting: "ASCEND" as const },
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
