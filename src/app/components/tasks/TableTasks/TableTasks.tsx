import { Table, tableSorters } from "@amsterdam/wonen-ui"
import useValues from "./hooks/useValues"
import { useUsersMe } from "app/state/rest/index"

type Props = {
  data?: Components.Schemas.CaseUserTaskList[]
  isBusy: boolean
}

type Value = string | number | null | undefined

const { sortStrings, sortDates } = tableSorters

// If user is owner, move item to top.
const sortUserUp = (a: Value, b: Value, id: string) => {
  if (a === id) return 1
  if (b === id) return -1
  return sortStrings(a, b)
}

const TableTasks: React.FC<Props> = ({ data, isBusy }) => {
  const values = useValues(data)
  const [me] = useUsersMe()

  const sortOwners = (a: Value, b: Value) => me?.id ? sortUserUp(a, b, me.id) : sortStrings(a, b)

  const columns = [
    { header: "Behandelaar", sorter: sortOwners },
    { header: "Adres", minWidth: 150, sorter: sortStrings },
    { header: "Open taak", minWidth: 100, sorter: sortStrings },
    { header: "Slotdatum", minWidth: 50, sorter: sortDates, defaultSorting: "ASCEND" as const },
    { minWidth: 140 }
  ]

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
