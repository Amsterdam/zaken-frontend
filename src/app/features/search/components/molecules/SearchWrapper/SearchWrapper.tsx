import React, { useCallback } from "react"
import { SearchBar } from "@datapunt/asc-ui"
import styled from "styled-components"
import debounce from "lodash.debounce"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import SearchResults from "app/features/search/components/molecules/SearchResults/SearchResults"
import useURLState from "app/features/shared/hooks/useURLState/useURLState"

const MIN_SEARCH_LENGTH = 3
const DELAY = 750

const SearchBarWrap = styled.div`
  max-width: 500px;
`

const isValidSearchString = (s: string) => s.length >= MIN_SEARCH_LENGTH

const SearchWrapper: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const [searchString, setSearchString] = useURLState("query")
  const delayedQuery = useCallback(debounce(setSearchString, DELAY), [setSearchString])

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.trim()
    setSearchString(searchString)
    if (isValidSearchString(searchString)) delayedQuery(searchString)
  }, [delayedQuery, setSearchString])

  return (
    <>
      <RowWithColumn>
        <SearchBarWrap>
          <SearchBar
            placeholder="Zoek op postcode en huisnummer"
            value={ searchString }
            onChange={ onChange }
          />
        </SearchBarWrap>
      </RowWithColumn>
      { isValidSearchString(searchString) &&
        <RowWithColumn>
          <SearchResults searchString={ searchString } />
        </RowWithColumn>
      }
    </>
  )
}

export default SearchWrapper
