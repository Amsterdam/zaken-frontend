import React, { useMemo } from "react"

import to from "app/features/shared/routing/to"
import Table from "app/features/shared/components/molecules/Table/Table"
import OpenButton from "app/features/shared/components/atoms/OpenButton/OpenButton"
import DateDisplay from "app/features/shared/components/atoms/DateDisplay/DateDisplay"


type Props = {
  data?: { results: Components.Schemas.Case[] }
  isBusy: boolean
}

const columns = [
  { header: "Adres", minWidth: 300 },
  { header: "Situatie", minWidth: 100 },
  { header: "Datum uitgezet", minWidth: 100 },
  { minWidth: 140 }
]

const mapData = (data: Components.Schemas.Case) => [
  data.address.full_address ?? "-",
  data.current_state.status_name,
  data.current_state.state_date ? <DateDisplay date={ data.current_state.state_date } /> : "-",
  <OpenButton href={to("/cases/:id", { id: data.id })} text="Zaakdetails" />
]

const TableCases: React.FC<Props> = ({ data, isBusy }) => {
  const mappedData = useMemo(() => data?.results?.map(mapData), [ data ])

  return (<Table
    columns={columns}
    data={mappedData}
    loading={data === undefined || isBusy}
    numLoadingRows={10}
    hasFixedColumn={true}
    noValuesPlaceholder={"Er zijn geen zaken voor deze dag"}
  />)
}

export default TableCases
