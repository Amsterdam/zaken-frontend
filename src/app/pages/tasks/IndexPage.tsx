import { type RouteComponentProps } from "@reach/router"
import { Heading } from "@amsterdam/asc-ui"

import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/components/layouts/Grid"
import Tasks from "app/components/tasks/Tasks/Tasks"

const IndexPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <RowWithColumn>
      <Heading>Takenoverzicht</Heading>
    </RowWithColumn>
    <Tasks />
  </DefaultLayout>
)

export default IndexPage
