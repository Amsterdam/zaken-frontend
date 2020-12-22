import React from "react"
import { RouteComponentProps } from "@reach/router"


import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"

const IndexPage: React.FC<RouteComponentProps> = () => (
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <p>Invorderingen</p>
      </RowWithColumn>
    </DefaultLayout>
  )

export default IndexPage
