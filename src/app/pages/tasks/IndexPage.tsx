import { RouteComponentProps } from "@reach/router"
import { Heading } from "@amsterdam/asc-ui"

import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/components/layouts/Grid"
import BreadCrumbs from "app/components/shared/BreadCrumbs/BreadCrumbs"
import Tasks from "app/components/tasks/Tasks/Tasks"

const IndexPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <RowWithColumn>
      <BreadCrumbs />
    </RowWithColumn>
    <RowWithColumn>
      <Heading>Takenoverzicht</Heading>
    </RowWithColumn>
    <Tasks />
  </DefaultLayout>
)

export default IndexPage
