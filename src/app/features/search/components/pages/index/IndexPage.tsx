import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Row } from "@datapunt/asc-ui/lib/components/Grid"
import SearchWrapper from "app/features/search/components/organisms/SearchWrapper/SearchWrapper"

import Heading from "app/features/shared/components/atoms/Heading/Heading"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

const IndexPage: React.FC<RouteComponentProps> = () => (
    <DefaultLayout>
      
      <Row halign="flex-start">
        <Heading>Zoeken</Heading>
      </Row>
      <Row>  
        <SearchWrapper />
      </Row>
    </DefaultLayout>
  )

export default IndexPage
