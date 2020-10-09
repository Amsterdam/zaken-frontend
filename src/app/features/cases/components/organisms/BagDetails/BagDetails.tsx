import React, { useMemo } from "react"
import { useBAG } from "app/state/rest"
import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const BAGDetails: React.FC<Props> = ({ bagId }) => {
  const { data } = useBAG(bagId)
  const result = data?.results[0]

  const values = useMemo(() => ({
    "Adres": result?.adres,
    "Adresseerbaar Object ID": result?.adresseerbaar_object_id,
    "BAG Huisletter": result?.bag_huisletter,
    "BAG Toevoeging": result?.bag_toevoeging,
    "Dataset": result?.dataset,
    "Huisnummer": result?.huisnummer,
    "Landelijk ID": result?.landelijk_id,
    "Postcode": result?.postcode,
    "Status": result?.status,
    "Straatnaam": result?.straatnaam,
    "Subtype": result?.subtype,
    "Subtype ID": result?.subtype_id,
    "Toevoeging": result?.toevoeging,
    "Type": result?.type,
    "Type adres": result?.type_adres,
    "VBO Status": result?.vbo_status,
    "Woonplaats": result?.woonplaats
  }), [ result ])

  return <DefinitionList
    numInitialVisibleRows={5}
    title="Basis Administratie Gebouwen"
    values={values}
  />
}

export default BAGDetails
