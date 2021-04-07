import React from "react"
import { Heading, FormTitle, SearchBar } from "@amsterdam/asc-ui"
import styled from "styled-components"
import debounce from "lodash.debounce"

import { RowWithColumn } from "app/components/layouts/Grid/Row"
import SearchResults from "app/components/search/SearchResults/SearchResults"
import useURLState from "app/hooks/useURLState/useURLState"

const DELAY = 750
const MAX_WIDTH = "500px"

const StyledFormTitle = styled(FormTitle)`
  max-width: ${ MAX_WIDTH };
`
const SearchBarWrap = styled.div`
  max-width: ${ MAX_WIDTH };
`

const SearchWrapper: React.FC = () => {
  const [searchString, setSearchString] = useURLState("query")
  const debouncedSetSearchString = debounce(setSearchString, DELAY)
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchString(event.target.value.trim())
  const onClear = () => debouncedSetSearchString("")

  return (
    <>
      <RowWithColumn>
        <Heading>Adres zoeken</Heading>
        <StyledFormTitle>Ook om een zaak aan te maken op dit adres</StyledFormTitle>
        <SearchBarWrap>
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
