import React, { useState, useCallback } from "react"
import { RouteComponentProps } from "@reach/router"
import { SearchBar } from "@datapunt/asc-ui"
import _ from "lodash"

import Heading from "app/features/shared/components/atoms/Heading/Heading"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import SearchResults from "app/features/search/components/organisms/SearchResults/SearchResults"

type Props = {
  searchString: string
}

const IndexPage: React.FC<RouteComponentProps> = () => {
  const [searchString, setSearchString] = useState("")
  const delayedQuery = useCallback(_.debounce( setSearchString, 750), [ setSearchString ])
  
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let searchString = event.target.value.trim()
    searchString.length > 2 && delayedQuery(searchString)
  }, [ delayedQuery ])

  return (
    <DefaultLayout>
      // TODO: Remove Heading
      <Heading>Zoeken</Heading>
      <SearchBar 
              placeholder="Zoek op postcode/huisnummer of straatnaam"
              onChange={handleChange}
            />
      <SearchResults searchString={ searchString } />
    </DefaultLayout>
  )
  }

export default IndexPage
