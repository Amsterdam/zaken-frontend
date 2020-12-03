import React from "react"
import { SearchBar } from "@amsterdam/asc-ui"
import styled from "styled-components"
import debounce from "lodash.debounce"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import SearchResults from "app/features/search/components/molecules/SearchResults/SearchResults"
import useURLState from "app/features/shared/hooks/useURLState/useURLState"

const DELAY = 750

const SearchBarWrap = styled.div`
  max-width: 500px;
`

const SearchWrapper: React.FC = () => {
  const [searchString, setSearchString] = useURLState("query")
  const debouncedSetSearchString = debounce(setSearchString, DELAY)
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchString(event.target.value.trim())
  const onClear = () => debouncedSetSearchString("")

  return (
    <>
      <RowWithColumn>
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
