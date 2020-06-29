import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, Heading } from "@datapunt/asc-ui"
import { Document } from "@datapunt/asc-assets/lib"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"

import TableCases from "app/features/cases/components/organisms/TableCases/TableCases"
import to from "../../../../shared/routing/to"

const IndexPage: React.FC<RouteComponentProps> = () => (
    <DefaultLayout>
      <Heading>Zaken overzicht</Heading>
      <ActionButtonWrap>
        <Button as='a' variant="primary" iconLeft={<Document />} href={to("/cases/create")}>Nieuwe zaak</Button>
      </ActionButtonWrap>
      <TableCases />
    </DefaultLayout>
  )

export default IndexPage
