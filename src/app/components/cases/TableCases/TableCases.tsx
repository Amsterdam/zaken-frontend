import { useMemo } from "react"
import { DateDisplay } from "@amsterdam/wonen-ui"

import to from "app/routing/utils/to"
import Table from "app/components/shared/Table/Table"
import OpenButton from "app/components/shared/OpenButton/OpenButton"
import sortByDate from "./utils/sortByDate"
import first from "./utils/first"
import navigateTo from "app/routing/navigateTo"

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

const onClick = (id: Components.Schemas.Case["id"]) => (e: React.MouseEvent) => {
  navigateTo("/zaken/:id", { id })
}

const mapData = (data: Components.Schemas.Case) => {

  const { id, address, current_states } = data
  const startDate = first(current_states.map(({ start_date }) => start_date).sort(sortByDate("DESC")))

  return {
    href: to("/zaken/:id", { id }),
    onClick: onClick(id),
    itemList: [
      address.full_address ?? "-",
      current_states.length > 0 ? current_states.map(({ status_name }) => status_name).join(", ") : "-",
      startDate !== undefined ? <DateDisplay date={ startDate } /> : "-",
      <OpenButton href={ to("/zaken/:id", { id }) } text="Zaakdetails" />
    ]
  }
}

const TableCases: React.FC<Props> = ({ data, isBusy }) => {
  const mappedData = useMemo(() => data?.results?.map(mapData), [ data ])

  return (<Table
    columns={columns}
    data={mappedData}
    loading={data === undefined || isBusy}
    numLoadingRows={10}
    hasFixedColumn={true}
    noValuesPlaceholder="Er zijn geen zaken voor deze dag"
  />)
}

export default TableCases
