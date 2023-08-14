import { useBAG, useBAGLodging } from "app/state/rest"
import { DefinitionList } from "@amsterdam/wonen-ui"
import getAddressFromBagResults from "app/components/addresses/utils/getAddressFromBagResults"
import useValues from "./hooks/useValues"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const ObjectDetails: React.FC<Props> = ({ bagId }) => {

  const [BAGAddressResponse, { isBusy: isBusyAddress }] = useBAG(bagId)
  const BAGAddress = getAddressFromBagResults(BAGAddressResponse)


  const { type, subtype_id } = BAGAddress ?? {}
  const [BAGObject, { isBusy: isBusyObject }] = useBAGLodging(type, subtype_id)

  const isBusy = isBusyAddress || isBusyObject
  const values = useValues(BAGAddress, BAGObject)

  return (
    <DefinitionList
      loading={ isBusy }
      title="Objectdetails"
      data={ values }
    />
  )
}

export default ObjectDetails
