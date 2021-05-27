import { useBAGWithZipCode } from "app/state/rest"
import useValues from "./hooks/useValues"
import Table from "app/components/shared/Table/Table"

export type SearchResult = Pick<BAGAddressResponse["results"][0], "adres" | "postcode" | "adresseerbaar_object_id">

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

const SearchResults: React.FC<Props> = ({ searchString }) => {

  const [data, { isBusy }] = useBAGWithZipCode(isValidSearchString(searchString) ? searchString : undefined)
  const values = useValues(Array.isArray(data?.results) ? data!.results : undefined)

  return (
    isValidSearchString(searchString) ?
    <Table
      columns={ columns }
      data={ values }
      loading={ isBusy }
      numLoadingRows={ 1 }
      hasFixedColumn={ true }
      noValuesPlaceholder="Er zijn geen adressen gevonden"
    /> :
    null
  )
}
export default SearchResults
