import { Table, tableSorters } from "@amsterdam/wonen-ui"
import useValues from "./hooks/useValues"

type Props = {
  data?: Components.Schemas.CaseUserTaskList[]
  isBusy: boolean
}

const { sortStrings, sortDates } = tableSorters

const columns = [
  { header: "Behandelaar" },
  { header: "Adres", minWidth: 150, sorter: sortStrings },
  { header: "Open taak", minWidth: 100, sorter: sortStrings },
  { header: "Slotdatum", minWidth: 50, sorter: sortDates, defaultSorting: "ASCEND" as const },
  { minWidth: 140 }
]

const TableTasks: React.FC<Props> = ({ data, isBusy }) => {

  const values = useValues(data)

  return (
    <Table
      hasFixedColumn
      columns={ columns }
      data={ values }
      loading={ isBusy }
      numLoadingRows={ 10 }
      noValuesPlaceholder="Er zijn momenteel geen open taken voor de gekozen filters"
    />
  )
}

export default TableTasks
