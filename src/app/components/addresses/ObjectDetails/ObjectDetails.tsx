import { useBenkAgg } from "app/state/rest"
import { DefinitionList } from "@amsterdam/wonen-ui"
import { getAddressFromBenkAggResponse } from "app/components/addresses/utils"
import useValues from "./hooks/useValues"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const ObjectDetails: React.FC<Props> = ({ bagId }) => {
  const [benkAggResponse, { isBusy }] = useBenkAgg(bagId)
  const benkAggAddress = getAddressFromBenkAggResponse(benkAggResponse)
  const values = useValues(benkAggAddress)

  return (
    <DefinitionList
      loading={ isBusy }
      title="Objectdetails"
      data={ values }
    />
  )
}

export default ObjectDetails
