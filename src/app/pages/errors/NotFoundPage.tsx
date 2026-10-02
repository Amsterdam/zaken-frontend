import { Heading } from "@amsterdam/asc-ui"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"

const NotFoundPage: React.FC = () => (
  <DefaultLayout>
    <Heading>404</Heading>
    <p>Helaas, deze pagina bestaat niet</p>
  </DefaultLayout>
)

export default NotFoundPage
