import React, { useState, useCallback } from "react"
import { SearchBar } from "@datapunt/asc-ui"
import _ from "lodash"

import SearchResults from "app/features/search/components/organisms/SearchResults/SearchResults"

type Props = {
  searchString: string
}

const SearchWrapper: React.FC = () => {
  const [searchString, setSearchString] = useState("")
  const delayedQuery = useCallback(_.debounce( setSearchString, 750), [ setSearchString ])
  
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let searchString = event.target.value.trim()
    searchString.length > 2 && delayedQuery(searchString)
  }, [ delayedQuery ])

  return (
      <>
       <SearchBar 
            placeholder="Zoek op postcode en huisnummer"
            onChange={handleChange}
        />
        <SearchResults searchString={ searchString } />
    </>
  )
}

export default SearchWrapper
