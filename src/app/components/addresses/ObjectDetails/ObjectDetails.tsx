import { useBAG, useBAGLodging } from "app/state/rest"
import { DefinitionList } from "@amsterdam/wonen-ui"
import useValues from "./hooks/useValues"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const ObjectDetails: React.FC<Props> = ({ bagId }) => {

  const [BAGAddress, { isBusy: isBusyAddress }] = useBAG(bagId)
  const { type, subtype_id } = BAGAddress?.results[0] ?? {}
  const [BAGObject, { isBusy: isBusyObject }] = useBAGLodging(type, subtype_id)

  const isBusy = isBusyAddress || isBusyObject
  const values = useValues(BAGAddress, BAGObject)

  return <DefinitionList
    isLoading={ isBusy }
    title="Objectdetails"
    data={ values }
  />
}

export default ObjectDetails
