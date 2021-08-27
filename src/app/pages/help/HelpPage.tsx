import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/components/layouts/Grid"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import HelpContent from "app/components/help/HelpContent/HelpContent"

const IndexPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <RowWithColumn>
      <PageHeading />
    </RowWithColumn>
    <RowWithColumn>
      <HelpContent />
    </RowWithColumn>
  </DefaultLayout>
)

export default IndexPage
