import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import TableCaseVisits from "app/features/caseVisits/components/organisms/TableCaseVisits/TableCaseVisits"

const IndexPage: React.FC<RouteComponentProps> = () => (
    <DefaultLayout>
      <Heading>Zaakbezoeken overzicht</Heading>
      <TableCaseVisits />
    </DefaultLayout>
  )

export default IndexPage
