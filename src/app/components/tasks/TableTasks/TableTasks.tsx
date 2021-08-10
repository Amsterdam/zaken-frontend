import Table from "app/components/shared/Table/Table"
import useValues from "./hooks/useValues"

type Props = {
  data?: Components.Schemas.CamundaTaskList[]
  isBusy: boolean
}

const sortAdress = (a: any, b: any) => a?.itemList[0].localeCompare(b?.itemList[0])
const sortCases = (a: any, b: any) => a?.itemList[1].localeCompare(b?.itemList[1])
const sortDates = (a: any, b: any) => {
  // If there is no date, return -1 to put it at the end of the list.
  if (a?.itemList[2]?.props?.date === undefined) {
    return 1
  }
  if (b?.itemList[2]?.props?.date === undefined) {
    return -1
  }
  return new Date(a?.itemList[2]?.props?.date).getTime() - new Date(b?.itemList[2]?.props?.date).getTime()
}

const columns = [
  { header: "Adres", minWidth: 150, sorter: sortAdress },
  { header: "Open taak", minWidth: 100, sorter: sortCases },
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
