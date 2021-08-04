import Table from "app/components/shared/Table/Table"
import useValues from "./hooks/useValues"

type Props = {
  data?: Components.Schemas.CamundaTaskList[]
  isBusy: boolean
}

const columns = [
  { header: "Adres", minWidth: 150, dataIndex: "address", sorter: true, defaultSortOrder: "descend" },
  { header: "Open taak", minWidth: 100, dataIndex: "openCase", sorter: true },
  { header: "Slotdatum", minWidth: 50 },
  { minWidth: 140 }
]

const TableTasks: React.FC<Props> = ({ data, isBusy }) => {

  const values = useValues(data)

  const onchange = (obj: any) => {
    console.log("onchange obj", obj)
    console.log("onchange values", values)
  }

  return (
    <Table
      hasFixedColumn
      columns={ columns }
      data={ values }
      loading={ isBusy }
      numLoadingRows={ 10 }
      noValuesPlaceholder="Er zijn momenteel geen open taken voor de gekozen filters"
      onchange={onchange}
    />
  )
}

export default TableTasks
