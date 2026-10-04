import { type ReactNode } from "react"
import { Column, Grid, Heading } from "@amsterdam/design-system-react"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import CaseSummary from "./CaseSummary"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  title: string
  /** The form. */
  children: ReactNode
}

/**
 * The page of a form about a case: the title, which case it is about, and the
 * form in a white area.
 */
const CaseFormPage: React.FC<Props> = ({ id, title, children }) => (
  <DefaultLayout>
    <Grid.Cell span="all" appearance="transparent">
      <Heading level={1}>{title}</Heading>
    </Grid.Cell>
    <Grid.Cell span={{ narrow: 4, medium: 8, wide: 8 }}>
      <Column gap="large">
        <CaseSummary id={id} />
        {children}
      </Column>
    </Grid.Cell>
  </DefaultLayout>
)

export default CaseFormPage
