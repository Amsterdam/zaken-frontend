import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@amsterdam/asc-ui"

import { RowWithColumn } from "app/components/layouts/Grid/Row"
import SearchWrapper from "app/components/search/SearchWrapper/SearchWrapper"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"

const IndexPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout showSearchButton={false}>
    <RowWithColumn topSpacing={ 12 }>
      <Heading>Adres zoeken</Heading>
    </RowWithColumn>
    <SearchWrapper />
  </DefaultLayout>
)

export default IndexPage
