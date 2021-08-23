import useValues from "./hooks/useValues"
import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import { sortStrings, sortDates } from "app/components/shared/Table/utils/sorters"

type Props = {
  data?: Components.Schemas.PaginatedCaseList
  isBusy: boolean
}

const columns = [
  { header: "Adres", sorter: sortStrings, minWidth: 300, defaultSorting: "ASCEND" as const },
  { header: "Status", sorter: sortStrings, minWidth: 100 },
  { header: "Laatst gewijzigd", sorter: sortDates, minWidth: 100 },
  { minWidth: 140 }
]

const TableCases: React.FC<Props> = ({ data, isBusy }) => {

  const values = useValues(data?.results)

  const onClickRow = (data: Exclude<typeof values, undefined>[0]) => {
    const id = data[4]
    navigateTo("/zaken/:id", { id })
  }

  return (
    <Table
      hasFixedColumn
      loading={ isBusy }
      numLoadingRows={ 10 }
      columns={ columns }
      data={ values }
      onClickRow={ onClickRow }
      noValuesPlaceholder="Er zijn geen zaken voor deze dag"
    />
  )
}

export default TableCases
