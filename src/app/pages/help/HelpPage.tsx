import { Grid, Heading } from "@amsterdam/design-system-react"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import HelpContent from "@/app/components/help/HelpContent/HelpContent"

const HelpPage: React.FC = () => (
  <DefaultLayout>
    <Grid.Cell span="all" appearance="transparent">
      <Heading level={1}>Hulp</Heading>
    </Grid.Cell>
    <Grid.Cell span="all">
      <HelpContent />
    </Grid.Cell>
  </DefaultLayout>
)

export default HelpPage
