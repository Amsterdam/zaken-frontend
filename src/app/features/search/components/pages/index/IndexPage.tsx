import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@datapunt/asc-ui"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import SearchWrapper from "app/features/search/components/organisms/SearchWrapper/SearchWrapper"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

const IndexPage: React.FC<RouteComponentProps> = () => (

    <DefaultLayout showSearchButton={false}>
      <RowWithColumn>
        <Heading>Adres zoeken</Heading>
      </RowWithColumn>
      <SearchWrapper />
    </DefaultLayout>
  )

export default IndexPage
