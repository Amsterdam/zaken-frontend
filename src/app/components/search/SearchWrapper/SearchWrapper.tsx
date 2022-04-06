import { Heading, FormTitle, SearchBar } from "@amsterdam/asc-ui"
import debounce from "lodash.debounce"

import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import Column from "app/components/layouts/Grid/Column"
import SearchResults from "app/components/search/SearchResults/SearchResults"
import useURLState from "app/hooks/useURLState/useURLState"

const DELAY = 750

const SearchWrapper: React.FC = () => {
  const [searchString, setSearchString] = useURLState("query")
  const debouncedSetSearchString = debounce(setSearchString, DELAY)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchString(event.target.value.trim())
  const onClear = () => debouncedSetSearchString("")

  return (
    <>
      <Row>
        <Column spanLarge={ 50 }>
          <Heading>Adres zoeken</Heading>
          <FormTitle>Ook om een nieuwe zaak aan te maken op een specifiek adres</FormTitle>
          <SearchBar
            placeholder="Zoek op postcode en huisnummer of straat"
            value={ searchString }
            onChange={ onChange }
            onClear={ onClear }
            autoFocus={ true }
          />
        </Column>
      </Row>
      <RowWithColumn>
        <SearchResults searchString={ searchString } />
      </RowWithColumn>
    </>
  )
}

export default SearchWrapper
