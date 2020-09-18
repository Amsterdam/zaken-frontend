import React, { useState, useCallback } from "react"
import { SearchBar, themeSpacing } from "@datapunt/asc-ui"
import styled from "styled-components"
import _ from "lodash.debounce"

import SearchResults from "app/features/search/components/organisms/SearchResults/SearchResults"

const MIN_SEARCH_LENGHT = 3
const DELAY = 750

const SearchBarWrap = styled.div`
  margin: ${ themeSpacing(10) } 0;
  width: 100%;
  max-width: 500px;
`

const SearchResultsWrap = styled.div`
width: 100%;
`
const isValidSearchString = (s: string) => s !== undefined && s.length >= MIN_SEARCH_LENGHT

const SearchWrapper: React.FC = () => {
  const [searchString, setSearchString] = useState("")
  const delayedQuery = useCallback(_( setSearchString, DELAY), [ setSearchString ])
  
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.trim()
    isValidSearchString(searchString) && delayedQuery(searchString)
  }, [ delayedQuery ])

  return (
      <>
      <SearchBarWrap>
        <SearchBar 
              placeholder="Zoek op postcode en huisnummer"
              onChange={handleChange}
        />
      </SearchBarWrap>

      {isValidSearchString(searchString) && 
        <SearchResultsWrap>
          <SearchResults searchString={ searchString } />
        </SearchResultsWrap>
      }
    </>
  )
}

export default SearchWrapper
