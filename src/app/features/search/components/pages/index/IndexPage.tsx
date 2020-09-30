import React from "react"
import { RouteComponentProps } from "@reach/router"

import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import SearchWrapper from "app/features/search/components/organisms/SearchWrapper/SearchWrapper"
import Heading from "app/features/shared/components/atoms/Heading/Heading"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Column from "app/features/shared/components/atoms/Grid/Column"

const IndexPage: React.FC<RouteComponentProps> = () => (
  
    <DefaultLayout showSearchButton={false}>
      
      <RowWithColumn>
        <Heading>Adres zoeken</Heading>
      </RowWithColumn>
      <Row>
        <Column>
          <SearchWrapper />
        </Column>
      </Row>
    </DefaultLayout>
  )

export default IndexPage
