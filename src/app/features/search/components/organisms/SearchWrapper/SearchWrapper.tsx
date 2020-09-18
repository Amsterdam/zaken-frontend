import React, { useState, useCallback } from "react"
import { SearchBar, themeSpacing } from "@datapunt/asc-ui"
import styled from "styled-components"
import _ from "lodash.debounce"

import SearchResults from "app/features/search/components/organisms/SearchResults/SearchResults"

const SearchBarWrap = styled.div`
  margin: ${ themeSpacing(10) } 0;
  width: 100%;
  max-width: 500px;
`

const SearchResultsWrap = styled.div`
width: 100%;
`

const SearchWrapper: React.FC = () => {
  const [searchString, setSearchString] = useState("")
  const delayedQuery = useCallback(_( setSearchString, 750), [ setSearchString ])
  
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.trim()
    searchString.length > 2 && delayedQuery(searchString)
  }, [ delayedQuery ])

  return (
      <>
      <SearchBarWrap>
        <SearchBar 
              placeholder="Zoek op postcode en huisnummer"
              onChange={handleChange}
        />
      </SearchBarWrap>

      {searchString.length > 2 && 
        <SearchResultsWrap>
          <SearchResults searchString={ searchString } />
        </SearchResultsWrap>
      }
    </>
  )
}

export default SearchWrapper
