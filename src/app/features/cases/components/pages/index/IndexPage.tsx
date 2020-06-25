import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, Heading } from "@datapunt/asc-ui"
import { Document } from "@datapunt/asc-assets/lib"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"

import CaseIndexTable from "app/features/cases/components/organisms/CaseIndexTable/CaseIndexTable"

const IndexPage: React.FC<RouteComponentProps> = () => (
    <DefaultLayout>
      <Heading>Zaken overzicht</Heading>
      <ActionButtonWrap>
        <Button variant="primary" iconLeft={<Document />}>Nieuwe zaak</Button>
      </ActionButtonWrap>
      <CaseIndexTable />
    </DefaultLayout>
  )

export default IndexPage
