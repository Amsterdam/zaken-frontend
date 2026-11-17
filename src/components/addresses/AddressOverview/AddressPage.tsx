import { type ReactNode } from "react"
import { Column, Grid } from "@amsterdam/design-system-react"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import { PageHeading } from "@/components/PageHeading/PageHeading"
import AddressHeading from "./AddressHeading"
import AddressTabs from "./AddressTabs"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
  children: ReactNode
}

/**
 * The fixed top of every page of an address: the address as the title and the
 * tabs. The content of the tab comes right below them, in the same white area.
 */
const AddressPage: React.FC<Props> = ({ bagId, children }) => (
  // The tabs are the navigation between the pages of an address.
  <DefaultLayout>
    <PageHeading hideBreadcrumbs>
      <AddressHeading bagId={bagId} />
    </PageHeading>
    <Grid.Cell span="all">
      <Column gap="large">
        <AddressTabs bagId={bagId} />
        {children}
      </Column>
    </Grid.Cell>
  </DefaultLayout>
)

export default AddressPage
