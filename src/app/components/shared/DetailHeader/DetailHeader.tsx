import Row from "app/components/layouts/Grid/Row"
import Column from "app/components/layouts/Grid/Column"
import AddressHeader from "app/components/addresses/AddressHeader/AddressHeader"

type Props = {
  bagId: string
  enableSwitch?: boolean
}

const DetailHeader: React.FC<Props> = ({ bagId, enableSwitch }) => (
  <Row>
    <Column spanLarge={50}>
      <AddressHeader bagId={ bagId! } enableSwitch = { enableSwitch } />
    </Column>
  </Row>
)

export default DetailHeader
