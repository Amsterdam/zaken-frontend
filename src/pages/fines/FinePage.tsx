import { Grid } from "@amsterdam/design-system-react"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import { PageHeading } from "@/components/PageHeading/PageHeading"
import FinesSearchWrapper from "@/components/fines/FinesSearchWrapper"

const FinePage: React.FC = () => (
  <DefaultLayout>
    <PageHeading title="Invorderingscheck" />
    <Grid.Cell span="all">
      <FinesSearchWrapper />
    </Grid.Cell>
  </DefaultLayout>
)

export default FinePage
