import React, { useMemo } from "react"
import { useCases } from "app/state/rest"
import Table from "app/features/shared/components/molecules/Table/Table"
import OpenButton from "app/features/shared/components/atoms/OpenButton/OpenButton"
import to from "app/features/shared/routing/to"

const columns = [
  { header:"Adres", minWidth: 300 },
  { minWidth: 210 }
]

const mapData = (data: Components.Schemas.Case) => [
  data.address.full_address ?? "-",
  data.address.bag_id ? <OpenButton href={to("/adres/:id", { id: data.address.bag_id })} text="Open" /> : null
]

const SearchResults: React.FC = () => {
  const { data, isBusy } = useCases()

  const mappedData = useMemo(() => data?.results?.map(mapData), [ data ])

  return (<Table
    columns={columns}
    data={mappedData}
    loading={data === undefined || isBusy}
    numLoadingRows={10}
    hasFixedColumn={true}
    noValuesPlaceholder={"Er zijn (nog) geen addressen gevonden"}
  />)
}
export default SearchResults
