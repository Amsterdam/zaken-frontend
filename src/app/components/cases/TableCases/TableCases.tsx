import useValues from "./hooks/useValues"
import Table from "app/components/shared/Table/Table"

type Props = {
  data?: Components.Schemas.PaginatedCaseList
  isBusy: boolean
}

const columns = [
  { header: "Adres", minWidth: 300 },
  { header: "Status", minWidth: 100 },
  { header: "Laatst gewijzigd", minWidth: 100 },
  { minWidth: 140 }
]

const TableCases: React.FC<Props> = ({ data, isBusy }) => {

  const values = useValues(data?.results)

  return (
    <Table
      hasFixedColumn
      loading={ isBusy }
      numLoadingRows={ 10 }
      columns={ columns }
      data={ values }
      noValuesPlaceholder="Er zijn geen zaken voor deze dag"
    />
  )
}

export default TableCases
