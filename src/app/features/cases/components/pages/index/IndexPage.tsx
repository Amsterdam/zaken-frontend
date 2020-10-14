import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@datapunt/asc-ui"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"

import TableCases from "app/features/cases/components/organisms/TableCases/TableCases"

const IndexPage: React.FC<RouteComponentProps> = () => (
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <Heading>Overzicht gelopen zaken</Heading>
      </RowWithColumn>
      <RowWithColumn>
        <TableCases />
      </RowWithColumn>
    </DefaultLayout>
  )

export default IndexPage
