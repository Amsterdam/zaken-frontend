import { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@amsterdam/asc-ui"

import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/components/layouts/Grid"
import BreadCrumbs from "app/components/shared/BreadCrumbs/BreadCrumbs"
import Cases from "app/components/cases/Cases/Cases"

const IndexPage: FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <RowWithColumn>
      <BreadCrumbs />
    </RowWithColumn>
    <RowWithColumn>
      <Heading>Zakenoverzicht</Heading>
    </RowWithColumn>
    <Cases />
  </DefaultLayout>
)

export default IndexPage
