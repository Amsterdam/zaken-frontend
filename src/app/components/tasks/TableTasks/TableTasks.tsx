import Table from "app/components/shared/Table/Table"
import useValues from "./hooks/useValues"

type Props = {
  data?: Components.Schemas.CamundaTaskList[]
  isBusy: boolean
}

const columns = [
  { header: "Adres", minWidth: 150 },
  { header: "Open taak", minWidth: 100 },
  { header: "Slotdatum", minWidth: 50 },
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
