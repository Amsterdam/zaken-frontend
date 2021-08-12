import { useBAGWithZipCode } from "app/state/rest"
import useValues from "./hooks/useValues"
import Table from "app/components/shared/Table/Table"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import to from "app/routing/utils/to"
import navigateTo from "app/routing/navigateTo"

export type SearchResult = Pick<BAGAddressResponse["results"][0], "adres" | "postcode" | "adresseerbaar_object_id">

type Props = {
  searchString: string
}

const MIN_SEARCH_LENGTH = 3
const isValidSearchString = (s: string) => s.length >= MIN_SEARCH_LENGTH

const columns = [
  { header:"Adres", minWidth: 100 },
  { header:"Postcode", minWidth: 100 },
  { minWidth: 100, render: (value: string | number | boolean | undefined | null | React.ReactNode) =>
    typeof value === "string" ? <TableAction to={ to("/zaken/:id", { id: value }) }>Zaakdetails</TableAction> : undefined
  }
]

const SearchResults: React.FC<Props> = ({ searchString }) => {

  const [data, { isBusy }] = useBAGWithZipCode(isValidSearchString(searchString) ? searchString : undefined)
  const values = useValues(Array.isArray(data?.results) ? data!.results : undefined)

  const onClickRow = (event: React.MouseEvent, index: number, data: Exclude<typeof values, undefined>[0]) => {
    const bagId = data[2]
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
