import React, { useState, useCallback } from "react"
import { RouteComponentProps } from "@reach/router"
import { SearchBar } from "@datapunt/asc-ui"
import _ from "lodash"

import Heading from "app/features/shared/components/atoms/Heading/Heading"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import SearchResults from "app/features/search/components/organisms/SearchResults/SearchResults"

const IndexPage: React.FC<RouteComponentProps> = () => {
  const [searchString, setSearchString] = useState("")
  const delayedQuery = useCallback(_.debounce(( q: any ) => sendQuery(q), 750), [])
  const sendQuery = (query: any) => setSearchString(query)

  const handleChange = (event: any) => {
    let searchString: string = event.target.value
    searchString.length > 2 && delayedQuery(searchString)
  }

  type Props = {
    searchString: string
  }

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
