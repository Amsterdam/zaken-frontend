import { Grid, Heading } from "@amsterdam/design-system-react"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import FinesSearchWrapper from "@/components/fines/FinesSearchWrapper"

const FinePage: React.FC = () => (
  <DefaultLayout>
    <Grid.Cell span="all" appearance="transparent">
      <Heading level={1}>Invorderingscheck</Heading>
    </Grid.Cell>
    <Grid.Cell span="all">
      <FinesSearchWrapper />
    </Grid.Cell>
  </DefaultLayout>
)

export default FinePage
