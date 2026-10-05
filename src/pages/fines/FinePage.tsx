import { Grid, Heading, Paragraph } from "@amsterdam/design-system-react"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import FinesSearchWrapper from "@/components/fines/FinesSearchWrapper"

const FinePage: React.FC = () => (
  <DefaultLayout>
    <Grid.Cell span="all" appearance="transparent">
      <Heading level={1} className="ams-mb-s">
        Invorderingscheck
      </Heading>
      <Paragraph>
        Controleer met de invorderingscheck of de beschikking is opgepakt door
        belastingen.
      </Paragraph>
    </Grid.Cell>
    <Grid.Cell span="all">
      <FinesSearchWrapper />
    </Grid.Cell>
  </DefaultLayout>
)

export default FinePage
