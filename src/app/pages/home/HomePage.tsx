import React from "react"
import { RouteComponentProps } from "@reach/router"


import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import SearchWrapper from "app/features/search/SearchWrapper/SearchWrapper"
import HomeMenu from "app/features/home/HomeMenu/HomeMenu"
import { Heading } from "@amsterdam/asc-ui"

const IndexPage: React.FC<RouteComponentProps> = () => (
    <DefaultLayout>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <HomeMenu />
      </RowWithColumn>
      <RowWithColumn>
        <Heading>Adres zoeken</Heading>
      </RowWithColumn>
      <SearchWrapper />
    </DefaultLayout>
  )

export default IndexPage
