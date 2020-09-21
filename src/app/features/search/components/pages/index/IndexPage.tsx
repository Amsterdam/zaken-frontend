import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Row } from "@datapunt/asc-ui/lib/components/Grid"
import SearchWrapper from "app/features/search/components/organisms/SearchWrapper/SearchWrapper"

import Heading from "app/features/shared/components/atoms/Heading/Heading"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

const IndexPage: React.FC<RouteComponentProps> = () => (
  
    <DefaultLayout showSearchButton={false}>
      
      <Row halign="flex-start">
        <Heading>Adres zoeken</Heading>
      </Row>
      <Row>  
        <SearchWrapper />
      </Row>
    </DefaultLayout>
  )

export default IndexPage
