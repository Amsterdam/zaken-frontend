import { useBAGWithZipCode } from "app/state/rest"
import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import columns from "./columns"

export type SearchResult = Pick<BAGAddressResponse["results"][0], "adres" | "postcode" | "adresseerbaar_object_id">

type Props = {
  searchString: string
}

const MIN_SEARCH_LENGTH = 3
const isValidSearchString = (s: string) => s.length >= MIN_SEARCH_LENGTH

const SearchResults: React.FC<Props> = ({ searchString }) => {
  const [data, { isBusy }] = useBAGWithZipCode(isValidSearchString(searchString) ? searchString : undefined)

  const onClickRow = (data: any) => {
    navigateTo("/adres/:bagId", { bagId: data.adresseerbaar_object_id })
  }

  // Only show addresses with a bagId
  const dataSource = data?.results.filter((obj) => obj.adresseerbaar_object_id) || []

  return (
    isValidSearchString(searchString) ? (
      <Table
        hasFixedColumn
        columns={ columns }
        data={ dataSource }
        loading={ isBusy }
        numLoadingRows={ 1 }
        onClickRow={ onClickRow }
        emptyPlaceholder="Er zijn geen adressen gevonden"
        pagination={false}
      />
    ) : null
  )
}

export default SearchResults
