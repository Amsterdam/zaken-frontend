import { Grid } from "@amsterdam/design-system-react"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import { PageHeading } from "@/components/PageHeading/PageHeading"
import OidcValues from "@/components/auth/OidcValues/OidcValues"

const AuthPage: React.FC = () => (
  <DefaultLayout>
    <PageHeading title="Microsoft Entra-ID gebruiker" />
    <Grid.Cell span="all">
      <OidcValues />
    </Grid.Cell>
  </DefaultLayout>
)

export default AuthPage
