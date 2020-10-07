import React, { useMemo } from "react"

import to from "app/features/shared/routing/to"
import Table from "app/features/shared/components/molecules/Table/Table"
import OpenButton from "app/features/shared/components/atoms/OpenButton/OpenButton"

import { useCases } from "app/state/rest"


const columns = [
  { header:"Startdatum", minWidth: 100 },
  { header:"Adres", minWidth: 300 },
  { minWidth: 90 }
]

const mapData = (data: Components.Schemas.Case) => [
  data.start_date ?? "-",
  data.address.full_address ?? "-",
  data.identification ? <OpenButton href={to("/cases/:id", { id: data.identification })} text="Open" /> : null
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
