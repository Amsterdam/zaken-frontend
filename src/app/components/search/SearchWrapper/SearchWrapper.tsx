import { FC, ChangeEvent } from "react"
import { Heading, FormTitle, SearchBar } from "@amsterdam/asc-ui"
import styled from "styled-components"
import debounce from "lodash.debounce"

import { RowWithColumn } from "app/components/layouts/Grid/Row"
import SearchResults from "app/components/search/SearchResults/SearchResults"
import useURLState from "app/hooks/useURLState/useURLState"

const DELAY = 750

const SearchBarWrap = styled.div`
  max-width: 500px;
`

const SearchWrapper: FC = () => {
  const [searchString, setSearchString] = useURLState("query")
  const debouncedSetSearchString = debounce(setSearchString, DELAY)
  const onChange = (event: ChangeEvent<HTMLInputElement>) => debouncedSetSearchString(event.target.value.trim())
  const onClear = () => debouncedSetSearchString("")

  return (
    <>
      <RowWithColumn>
        <Heading>Adres zoeken</Heading>
        <SearchBarWrap>
          <FormTitle>Ook om een nieuwe zaak aan te maken op een specifiek adres</FormTitle>
          <SearchBar
            placeholder="Zoek op postcode en huisnummer"
            value={ searchString }
            onChange={ onChange }
            onClear={ onClear }
            autoFocus={ true }
          />
        </SearchBarWrap>
      </RowWithColumn>
      <RowWithColumn>
        <SearchResults searchString={ searchString } />
      </RowWithColumn>
    </>
  )
}

export default SearchWrapper
