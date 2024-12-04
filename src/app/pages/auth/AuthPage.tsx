
import { Heading } from "@amsterdam/asc-ui"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import NotAuthorizedAlert from "app/components/auth/NotAuthorizedAlert/NotAuthorizedAlert"
import OidcValues from "app/components/auth/OidcValues/OidcValues"

const AuthPage: React.FC = () => (
  <DefaultLayout>
    <Heading as="h2">Microsoft Entra-ID gebruiker</Heading>
    <NotAuthorizedAlert />
    <OidcValues />
  </DefaultLayout>
)

export default AuthPage
