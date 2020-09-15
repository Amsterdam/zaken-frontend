import React from "react"
import { RouteComponentProps } from "@reach/router"

import Heading from "app/features/shared/components/atoms/Heading/Heading"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import SearchResults from "app/features/search/components/organisms/SearchResults/SearchResults"

const IndexPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <Heading>Zoeken</Heading>
    <SearchResults />
  </DefaultLayout>
)

export default IndexPage
