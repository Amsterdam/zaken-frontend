import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, Heading } from "@datapunt/asc-ui"
import { Document } from "@datapunt/asc-assets/lib"

import to from "app/features/shared/routing/to"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"

import TableCases from "app/features/cases/components/organisms/TableCases/TableCases"

const IndexPage: React.FC<RouteComponentProps> = () => (
    <DefaultLayout>
      <RowWithColumn>
        <Heading>Zaken overzicht</Heading>
      </RowWithColumn>
      <RowWithColumn>
        <ButtonLink to={to("/cases/create")}>
          <Button as="span" variant="primary" iconLeft={<Document />}>Nieuwe zaak</Button>
        </ButtonLink>
      </RowWithColumn>
      <RowWithColumn>
        <TableCases />
      </RowWithColumn>
    </DefaultLayout>
  )

export default IndexPage
