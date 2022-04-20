import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import Cases from "app/components/cases/Cases/Cases"

const IndexPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <Cases />
  </DefaultLayout>
)

export default IndexPage
