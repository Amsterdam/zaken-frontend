
import Residents from "app/components/addresses/Residents/Residents"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

// TODO: Do show Residents by BAG_id
const People: React.FC<Props> = ({ bagId }) => <Residents bagId={ bagId } />
export default People
