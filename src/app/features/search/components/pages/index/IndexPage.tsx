import React, { useState } from "react"
import { RouteComponentProps } from "@reach/router"
import { SearchBar } from "@datapunt/asc-ui"

import Heading from "app/features/shared/components/atoms/Heading/Heading"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import SearchResults from "app/features/search/components/organisms/SearchResults/SearchResults"

const IndexPage: React.FC<RouteComponentProps> = () => {
  const [searchString, setSearchString] = useState("")

  const handleChange = (event: any) => {
    let searchString: string = event.target.value
    searchString.length > 2 && setSearchString(searchString)
  }

  type Props = {
    searchString: string
  }

  return (
    <DefaultLayout>
      // TODO: Add SearchForm, remove Heading
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
