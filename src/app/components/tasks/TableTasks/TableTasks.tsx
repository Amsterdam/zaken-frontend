import Table from "app/components/shared/Table/Table"
import useValues from "./hooks/useValues"

type Props = {
  data?: Components.Schemas.CamundaTaskList[]
  isBusy: boolean
}

const sortAdress = (a: any, b: any) => a?.[0].localeCompare(b?.[0])
const sortTasks = (a: any, b: any) => a?.[1].localeCompare(b?.[1])
const sortDates = (a: any, b: any) => {
  // If there is no date, return -1 to put it at the end of the list.
  if (a?.[2]?.props?.date === undefined) {
    return 1
  }
  if (b?.[2]?.props?.date === undefined) {
    return -1
  }
  return new Date(a?.[2]?.props?.date).getTime() - new Date(b?.[2]?.props?.date).getTime()
}

const columns = [
  { header: "Adres", minWidth: 150, sorter: sortAdress },
  { header: "Open taak", minWidth: 100, sorter: sortTasks },
  { header: "Slotdatum", minWidth: 50, sorter: sortDates },
  { minWidth: 140 }
]

const TableTasks: React.FC<Props> = ({ data, isBusy }) => {

  const [values, onClickRow] = useValues(data)

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
