import React, { useMemo } from "react"

import to from "app/features/shared/routing/to"
import Table from "app/features/shared/components/molecules/Table/Table"
import OpenButton from "app/features/shared/components/atoms/OpenButton/OpenButton"
import DateDisplay from "app/features/shared/components/atoms/DateDisplay/DateDisplay"

import { useCases } from "app/state/rest"

const columns = [
  { header: "Adres", minWidth: 300 },
  { header: "Situatie", minWidth: 100 },
  { header: "Datum uitgezet", minWidth: 100 },
  { minWidth: 140 }
]

const mapData = (data: Components.Schemas.Case) => [
  data.address.full_address ?? "-",
  "Niet gelopen",
  data.start_date ? <DateDisplay date={ data.start_date } /> : "-",
  data.identification ? <OpenButton href={to("/cases/:id", { id: data.identification })} text="Zaak details" /> : null
]

const TableCases: React.FC = () => {
  const { data, isBusy } = useCases()
  const mappedData = useMemo(() => data?.results?.map(mapData), [ data ])

  return (<Table
    columns={columns}
    data={mappedData}
    loading={data === undefined || isBusy}
    numLoadingRows={10}
    hasFixedColumn={true}
    noValuesPlaceholder={"Er zijn (nog) geen zaken gevonden"}
  />)
}

export default TableCases
