import React from "react"
import { RouteComponentProps } from "@reach/router"


import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/components/shared/components/atoms/Grid"
import BreadCrumbs from "app/components/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import PageHeading from "app/components/shared/components/molecules/PageHeading/PageHeading"
import HelpContent from "app/components/help/HelpContent/HelpContent"

const IndexPage: React.FC<RouteComponentProps> = () => (
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <HelpContent />
      </RowWithColumn>
    </DefaultLayout>
  )

export default IndexPage
