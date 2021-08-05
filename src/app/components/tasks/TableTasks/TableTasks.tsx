import Table from "app/components/shared/Table/Table"
import { useState } from "react"
import useValues from "./hooks/useValues"

type Props = {
  data?: Components.Schemas.CamundaTaskList[]
  isBusy: boolean
}

type DataType = {
  onClick?: (event: React.MouseEvent) => void
  itemList: React.ReactNode[]
}

const columns = [
  { header: "Adres", minWidth: 150, dataIndex: "address", sorter: true, defaultSortOrder: "descend" },
  { header: "Open taak", minWidth: 100, dataIndex: "openCase", sorter: true },
  { header: "Slotdatum", minWidth: 50, dataIndex: "closingDate", sorter: true },
  { minWidth: 140 }
]

type SortOrder = "descend" | "ascend"

const sortTasks = (columnKey: string, sortOrder: SortOrder = "ascend") => (a: any, b: any) => {
  const index = columnKey === "address" ? 0 : 1
  const first = sortOrder === "ascend" ? a : b
  const second = sortOrder === "ascend" ? b : a
  if (columnKey === "closingDate") {
    return new Date(first?.itemList[2]?.props?.date).getTime() - new Date(second?.itemList[2]?.props?.date).getTime()
  }
  return first?.itemList[index].localeCompare(second?.itemList[index])
}

const TableTasks: React.FC<Props> = ({ data, isBusy }) => {
  const [sortedValues, setSortedValues] = useState<DataType[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const values = useValues(data)

  const onchange = (obj: any) => {
    if (isBusy || !values || !obj.sorter) return
    setIsLoading(true)
    const newSortedValues = values.sort(sortTasks(obj.sorter.columnKey ,obj.sorter.order))
    setSortedValues(newSortedValues)
    setTimeout(() => {
      setIsLoading(false)
    }, 350)
  }

  return (
    <Table
      hasFixedColumn
      columns={ columns }
      data={ sortedValues || values }
      loading={ isBusy || isLoading }
      numLoadingRows={ 10 }
      noValuesPlaceholder="Er zijn momenteel geen open taken voor de gekozen filters"
      onchange={onchange}
    />
  )
}

export default TableTasks
