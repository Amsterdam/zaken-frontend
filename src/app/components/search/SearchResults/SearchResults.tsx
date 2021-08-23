import { useBAGWithZipCode } from "app/state/rest"
import useValues from "./hooks/useValues"
import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"

export type SearchResult = Pick<BAGAddressResponse["results"][0], "adres" | "postcode" | "adresseerbaar_object_id">

type Props = {
  searchString: string
}

const MIN_SEARCH_LENGTH = 3
const isValidSearchString = (s: string) => s.length >= MIN_SEARCH_LENGTH

const columns = [
  { header: "Adres", minWidth: 100 },
  { header: "Postcode", minWidth: 100 },
  { minWidth: 140 }
]

const SearchResults: React.FC<Props> = ({ searchString }) => {

  const [data, { isBusy }] = useBAGWithZipCode(isValidSearchString(searchString) ? searchString : undefined)
  const values = useValues(Array.isArray(data?.results) ? data!.results : undefined)

  const onClickRow = (data: Exclude<typeof values, undefined>[0]) => {
    const bagId = data[3]
    navigateTo("/adres/:bagId", { bagId })
  }

  return (
    isValidSearchString(searchString) ?
    <Table
      hasFixedColumn
      columns={ columns }
      data={ values }
      loading={ isBusy }
      numLoadingRows={ 1 }
      onClickRow={ onClickRow }
      noValuesPlaceholder="Er zijn geen adressen gevonden"
    /> :
    null
  )
}

export default SearchResults
