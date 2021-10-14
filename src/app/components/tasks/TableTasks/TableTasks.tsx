import { Table, tableSorters } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import useValues from "./hooks/useValues"

type Props = {
  data?: Components.Schemas.CaseUserTaskList[]
  isBusy: boolean
}

const { sortStrings, sortDates } = tableSorters

const columns = [
  { header: "Adres", minWidth: 150, sorter: sortStrings },
  { header: "Open taak", minWidth: 100, sorter: sortStrings },
  { header: "Slotdatum", minWidth: 50, sorter: sortDates, defaultSorting: "ASCEND" as const },
  { minWidth: 140 }
]

const TableTasks: React.FC<Props> = ({ data, isBusy }) => {

  const values = useValues(data)

  const onClickRow = (data: Exclude<typeof values, undefined>[0]) => {
    const id = data[4]
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
