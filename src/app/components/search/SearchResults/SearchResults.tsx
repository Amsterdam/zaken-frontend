import { Table } from "@amsterdam/wonen-ui"
import { useBagPdok } from "app/state/rest"
import useNavigation from "app/routing/useNavigation"
import columns from "./columns"

type Props = {
  searchString: string
}

const MIN_SEARCH_LENGTH = 3
const isValidSearchString = (s: string) => s.length >= MIN_SEARCH_LENGTH

const SearchResults: React.FC<Props> = ({ searchString }) => {
  const { navigateTo } = useNavigation()
  const isValid = isValidSearchString(searchString)
  const searchStringBagPdok = isValid ? searchString : undefined
  const [bagData, { isBusy: loading }] = useBagPdok(searchStringBagPdok)
  
  const onClickRow = (data: any) => {
    navigateTo("/adres/:bagId", { bagId: data.adresseerbaarobject_id })
  }

  // Only show addresses with a bagId
  const dataSource = bagData?.response?.docs?.filter((obj) => obj.adresseerbaarobject_id) || []

  return (
    isValid ? (
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
  )
}

export default SearchResults
