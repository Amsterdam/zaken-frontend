
import { Heading } from "@amsterdam/asc-ui"
import { useBagPdokByBagId } from "app/state/rest"
import { getAddressFromBagPdokResponse } from "app/components/addresses/utils"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const AddressHeadingByBagId: React.FC<Props> = ({ bagId }) => {
  const [data] = useBagPdokByBagId(bagId)
  const address = getAddressFromBagPdokResponse(data)

  return (
    <Heading as="h3">{ address?.weergavenaam }</Heading>
  )
}
export default AddressHeadingByBagId
