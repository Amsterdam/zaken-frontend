import React, { useMemo } from "react"
import { useBAGWithZipCode } from "app/state/rest"
import Table from "app/features/shared/components/molecules/Table/Table"
import OpenButton from "app/features/shared/components/atoms/OpenButton/OpenButton"
import to from "app/features/shared/routing/to"
import { BAGAddressResponse } from "app/state/rest/types/BAGAddressResponse"

type Props = {
  searchString: string
}

const columns = [
  { header:"Adres", minWidth: 300 },
  { header:"Postcode", minWidth: 210 },
  { minWidth: 210 }
]

type SearchResult = Pick<BAGAddressResponse["results"][0], "adres" | "postcode" | "subtype_id">
const mapData = (data: SearchResult) => [
  data.adres ?? "-",
  data.postcode ?? "-",
  data.subtype_id && data.adres ? <OpenButton href={to("/adres/:id", { id: data.subtype_id })} text="Bekijk" /> : null
]

const SearchResults: React.FC<Props> = ({ searchString }) => {
  const { data, isBusy } = useBAGWithZipCode(searchString)
  const mappedData = useMemo(() => 
    data?.results &&
      data?.results
        .filter((result) =>  (result && typeof result.postcode === "string" ))
        .map(mapData), [ data ])

  return (<Table
    columns={columns}
    data={mappedData}
    loading={data === undefined || isBusy}
    numLoadingRows={10}
    hasFixedColumn={true}
    noValuesPlaceholder={"Er zijn (nog) geen adressen gevonden"}
  />)
}
export default SearchResults
