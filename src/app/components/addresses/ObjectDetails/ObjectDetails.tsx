import { useBAG, useBAGLodging } from "app/state/rest"
import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"
import useValues from "./hooks/useValues"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const ObjectDetails: React.FC<Props> = ({ bagId }) => {

  const [BAGAddress, { isBusy: isBusyAddress }] = useBAG(bagId)
  const { type, subtype_id: subTypeId } = BAGAddress?.results[0] ?? {}
  const [BAGObject, { isBusy: isBusyObject }] = useBAGLodging(type, subTypeId)

  const isBusy = isBusyAddress || isBusyObject
  const values = useValues(BAGAddress, BAGObject)

  return <DefinitionList
    isLoading={ isBusy }
    numInitialVisibleRows={ 4 }
    title="Objectdetails"
    values={ values }
  />
}

export default ObjectDetails
