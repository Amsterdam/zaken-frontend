import React, { useMemo } from "react"
import { useBAGWithZipCode } from "app/state/rest"
import Table from "app/features/shared/components/molecules/Table/Table"
import OpenButton from "app/features/shared/components/atoms/OpenButton/OpenButton"
import to from "app/features/shared/routing/to"
import { BAGAddressResponse } from "app/state/rest/types/BAGAddressResponse"

type SearchResult = Pick<BAGAddressResponse["results"][0], "adres" | "postcode" | "subtype_id">
type Props = {
  searchString: string
}

const columns = [
  { header:"Adres", minWidth: 100 },
  { header:"Postcode", minWidth: 100 },
  { minWidth: 100 }
]

const filterData = (data: SearchResult) => typeof data?.postcode === "string"

const mapData = (data: SearchResult) => [
  data.adres ?? "-",
  data.postcode ?? "-",
  data.subtype_id ? <OpenButton href={to("/adres/:bagId", { bagId: data.subtype_id })} text="Bekijk" /> : null
]

const SearchResults: React.FC<Props> = ({ searchString }) => {
  const { data, isBusy } = useBAGWithZipCode(searchString)

  const mappedData = useMemo(() =>
    data?.results
      .filter(filterData)
      .map(mapData), [ data ])

  return (<Table
    columns={columns}
    data={mappedData}
    loading={data === undefined || isBusy}
    numLoadingRows={1}
    hasFixedColumn={true}
    noValuesPlaceholder={"Er zijn (nog) geen adressen gevonden"}
  />)
}
export default SearchResults
