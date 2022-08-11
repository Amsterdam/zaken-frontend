import { Paragraph } from "@amsterdam/asc-ui"
import { Table } from "@amsterdam/wonen-ui"
import { useBAGWithZipCode, useBAGWithStreet } from "app/state/rest"
import navigateTo from "app/routing/navigateTo"
import columns from "./columns"

export type SearchResult = Pick<BAGAddressResponse["results"][0], "adres" | "postcode" | "adresseerbaar_object_id">

type Props = {
  searchString: string
}

const REGEX_ZIP_CODE = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}/i

const MIN_SEARCH_LENGTH = 3
const isValidSearchString = (s: string) => s.length >= MIN_SEARCH_LENGTH

const SearchResults: React.FC<Props> = ({ searchString }) => {
  const isValid = isValidSearchString(searchString)
  const isZipCode = isValid && REGEX_ZIP_CODE.test(searchString)
  const searchStringZipcode = isZipCode ? searchString : undefined
  const searchStringStreet = isValid && !REGEX_ZIP_CODE.test(searchString) ? searchString : undefined
  const [dataZipCode, { isBusy: isBusyZipCode }] = useBAGWithZipCode(searchStringZipcode)
  const [dataStreet, { isBusy: isBusyStreet }] = useBAGWithStreet(searchStringStreet)

  const onClickRow = (data: any) => {
    navigateTo("/adres/:bagId", { bagId: data.adresseerbaar_object_id })
  }

  const loading = isBusyZipCode || isBusyStreet
  const data = isZipCode ? dataZipCode : dataStreet
  // Only show addresses with a bagId
  const dataSource = data?.results?.filter((obj) => obj.adresseerbaar_object_id) || []

  return (
    <>
      { data && data?.count > 100 && (
        <Paragraph strong>
          Er zijn meer dan 100 resultaten voor deze zoekopdracht. Specificeer je zoekterm.
        </Paragraph>
      )}
      { isValid ? (
        <Table
          lastColumnFixed
          columns={ columns }
          data={ dataSource }
          loading={ loading }
          numLoadingRows={ 1 }
          onClickRow={ onClickRow }
          emptyPlaceholder="Er zijn geen adressen gevonden"
          pagination={ false }
        />
        ) : null
      }
    </>
  )
}

export default SearchResults
