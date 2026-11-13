import { Grid } from "@amsterdam/design-system-react"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import { PageHeading } from "@/components/PageHeading/PageHeading"
import HelpContent from "@/components/help/HelpContent/HelpContent"

const HelpPage: React.FC = () => (
  <DefaultLayout>
    <PageHeading title="Hulp" />
    <Grid.Cell span="all">
      <HelpContent />
    </Grid.Cell>
  </DefaultLayout>
)

export default HelpPage
