import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@datapunt/asc-ui"

import { Row, RowWithColumn, Column } from "app/features/shared/components/atoms/Grid/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"

import TableCases from "app/features/cases/components/organisms/TableCases/TableCases"
import CasesFilter from "app/features/cases/components/organisms/CasesFilter/CasesFilter"

const IndexPage: React.FC<RouteComponentProps> = () => (
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <Heading>Overzicht gelopen zaken</Heading>
      </RowWithColumn>
      <Row>
        <Column spanLarge={80}>
          <TableCases />
        </Column>
        <Column spanLarge={20}>
          <CasesFilter />
        </Column>
      </Row>
    </DefaultLayout>
  )

export default IndexPage
