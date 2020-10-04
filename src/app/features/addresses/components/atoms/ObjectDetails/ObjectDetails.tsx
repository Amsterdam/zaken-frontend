import React, { useMemo } from "react"
import { useBAG, useBAGLodging } from "app/state/rest"
import Details from "app/features/shared/components/molecules/Details/Details"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const ObjectDetails: React.FC<Props> = ({ bagId }) => {
  const { data } = useBAG(bagId)
  const result = data?.results[0]
  const type = result?.type || ""
  const subTypeId = result?.subtype_id || ""
  const subData = useBAGLodging( type , subTypeId )
  
  const values = useMemo(() => ({
    "Bestemming": result?.type,
    "Oppervlakte": subData?.data?.oppervlakte ? `${ subData?.data?.oppervlakte } m2` : "-",
    "Bouwlagen": subData?.data?.bouwlagen,
    "Aantal kamers": subData?.data?.aantal_kamers
  }), [ result, subData ])

  return <Details
    numInitialVisibleRows={5}
    title="Basis Administratie Gebouwen"
    values={values}
  />
}

export default ObjectDetails
