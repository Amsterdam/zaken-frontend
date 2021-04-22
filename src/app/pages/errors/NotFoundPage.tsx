
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@amsterdam/asc-ui"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"

const NotFoundPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <Heading>404</Heading>
    <p>Helaas, deze pagina bestaat niet</p>
  </DefaultLayout>
)

export default NotFoundPage
