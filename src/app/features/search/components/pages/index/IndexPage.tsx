import React from "react"
import { RouteComponentProps } from "@reach/router"

import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import SearchWrapper from "app/features/search/components/organisms/SearchWrapper/SearchWrapper"
import Heading from "app/features/shared/components/atoms/Heading/Heading"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Column from "app/features/shared/components/atoms/Grid/Column"
import { themeSpacing } from "@datapunt/asc-ui"

const IndexPage: React.FC<RouteComponentProps> = () => (
  
    <DefaultLayout showSearchButton={false}>
      
      <RowWithColumn marginTop={themeSpacing(4)}>
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
