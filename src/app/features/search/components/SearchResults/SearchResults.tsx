import React, { useEffect, useMemo } from "react"
import { useBAGWithZipCode } from "app/state/rest"
import Table from "app/features/shared/components/molecules/Table/Table"
import OpenButton from "app/features/shared/components/atoms/OpenButton/OpenButton"
import to from "app/features/shared/routing/to"
import { BAGAddressResponse } from "app/state/rest/types/BAGAddressResponse"

type SearchResult = Pick<BAGAddressResponse["results"][0], "adres" | "postcode" | "landelijk_id">
type Props = {
  searchString: string
}

const MIN_SEARCH_LENGTH = 3
const isValidSearchString = (s: string) => s.length >= MIN_SEARCH_LENGTH

const columns = [
  { header:"Adres", minWidth: 100 },
  { header:"Postcode", minWidth: 100 },
  { minWidth: 100 }
]

const filterData = (data: SearchResult) => typeof data?.postcode === "string"

const mapData = (data: SearchResult) =>
({
  href: to("/adres/:bagId", { bagId: data.landelijk_id }),
  itemList: [
    data.adres ?? "-",
    data.postcode ?? "-",
    data.landelijk_id ? <OpenButton href={to("/adres/:bagId", { bagId: data.landelijk_id })} text="Bekijk" /> : null
  ]
})

const SearchResults: React.FC<Props> = ({ searchString }) => {
  const { data, isBusy, execGet } = useBAGWithZipCode(searchString, { lazy: true })

  useEffect(() => {
    if (isValidSearchString(searchString) === false) return
    execGet()
  }, [searchString, execGet])

  const mappedData = useMemo(() =>
    Array.isArray(data?.results) ?
      data!.results.filter(filterData).map(mapData) :
      undefined,
    [ data ]
  )

  return isValidSearchString(searchString) ?
    <Table
      columns={columns}
      data={mappedData}
      loading={data === undefined || isBusy}
      numLoadingRows={ 1 }
      hasFixedColumn={ true }
      noValuesPlaceholder="Er zijn (nog) geen adressen gevonden"
    /> :
    null
}
export default SearchResults
