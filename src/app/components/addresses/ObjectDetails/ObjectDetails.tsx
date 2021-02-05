import React, { useMemo } from "react"
import { useBAG, useBAGLodging } from "app/state/rest"
import DefinitionList from "app/components/shared/components/molecules/DefinitionList/DefinitionList"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const ObjectDetails: React.FC<Props> = ({ bagId }) => {
  const BAGData = useBAG(bagId)
  const result = BAGData?.data?.results[0]
  const type = result?.type
  const subTypeId = result?.subtype_id
  const { data } = useBAGLodging( type , subTypeId )

  const values = useMemo(() => ({
    "Bestemming": result?.type,
    "Oppervlakte": data?.oppervlakte ? `${ data?.oppervlakte } m2` : "-",
    "Bouwlagen": data?.bouwlagen,
    "Aantal kamers": data?.aantal_kamers
  }), [ result, data ])

  return <DefinitionList
    numInitialVisibleRows={5}
    title="Objectdetails"
    values={values}
  />
}

export default ObjectDetails
