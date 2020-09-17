import React from "react"
import { RouteComponentProps } from "@reach/router"
import SearchWrapper from "app/features/search/components/organisms/SearchWrapper/SearchWrapper"

import Heading from "app/features/shared/components/atoms/Heading/Heading"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

const IndexPage: React.FC<RouteComponentProps> = () => (
    <DefaultLayout>
      <Heading>Zoeken</Heading>
      <SearchWrapper />
    </DefaultLayout>
  )

export default IndexPage
