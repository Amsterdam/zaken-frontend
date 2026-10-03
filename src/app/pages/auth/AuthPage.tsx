import { Grid, Heading } from "@amsterdam/design-system-react"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import OidcValues from "app/components/auth/OidcValues/OidcValues"

const AuthPage: React.FC = () => (
  <DefaultLayout>
    <Grid.Cell span="all" appearance="transparent">
      <Heading level={1}>Microsoft Entra-ID gebruiker</Heading>
    </Grid.Cell>
    <Grid.Cell span="all">
      <OidcValues />
    </Grid.Cell>
  </DefaultLayout>
)

export default AuthPage
