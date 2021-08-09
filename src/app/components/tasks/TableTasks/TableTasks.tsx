import Table from "app/components/shared/Table/Table"
import useValues from "./hooks/useValues"

type Props = {
  data?: Components.Schemas.CamundaTaskList[]
  isBusy: boolean
}

const sortStrings = (a: string, b: string) => a.localeCompare(b)
const sortDates = (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()

const columns = [
  { header: "Adres", minWidth: 150, sorter: sortStrings },
  { header: "Open taak", minWidth: 100, sorter: sortStrings },
  { header: "Slotdatum", minWidth: 50, sorter: sortDates },
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
