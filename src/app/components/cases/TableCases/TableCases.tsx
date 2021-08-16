import useValues from "./hooks/useValues"
import Table from "app/components/shared/Table/Table"
import { DateDisplay } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import to from "app/routing/utils/to"
import { sortStrings, sortDates } from "app/components/shared/Table/utils/sorters"

type Props = {
  data?: Components.Schemas.PaginatedCaseList
  isBusy: boolean
}

const renderDate = (value: string | number | boolean | undefined | null | React.ReactNode) =>
  (value === undefined || typeof value === "string" ? <DateDisplay date={ value } emptyText="-" /> : "-") as React.ReactNode

const columns = [
  { header: "Adres", sorter: sortStrings, minWidth: 300 },
  { header: "Status", sorter: sortStrings, minWidth: 100 },
  { header: "Laatst gewijzigd", sorter: sortDates, render: renderDate, minWidth: 100 },
  { render: (value: string | number | boolean | undefined | null | React.ReactNode) =>
      typeof value === "string" ? <TableAction to={ to("/zaken/:id", { id: value }) }>Zaakdetails</TableAction> : undefined,
    minWidth: 140
  }
]

const TableCases: React.FC<Props> = ({ data, isBusy }) => {

  const values = useValues(data?.results)

  const onClickRow = (event: React.MouseEvent, index: number, data: Exclude<typeof values, undefined>[0]) => {
    const id = data[3]
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
