import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, Heading } from "@datapunt/asc-ui"
import { Document } from "@datapunt/asc-assets/lib"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"

import TableCases from "app/features/cases/components/organisms/TableCases/TableCases"
import to from "../../../../shared/routing/to"

import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"

const IndexPage: React.FC<RouteComponentProps> = () => (
    <DefaultLayout>
      <Heading>Zaken overzicht</Heading>
      <ActionButtonWrap>
        <ButtonLink to={to("/cases/create")}>
          <Button as="span" variant="primary" iconLeft={<Document />}>Nieuwe zaak</Button>
        </ButtonLink>
      </ActionButtonWrap>
      <TableCases />
    </DefaultLayout>
  )

export default IndexPage
