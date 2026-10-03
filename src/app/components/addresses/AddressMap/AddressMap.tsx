import { useBenkAgg } from "@/api/hooks"
import { MapView } from "@/components/MapView/MapView"
import { getAddressFromBenkAggResponse } from "app/components/addresses/utils"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
}

/** The address on the map, when the BAG knows where it is. */
const AddressMap: React.FC<Props> = ({ bagId }) => {
  const { data } = useBenkAgg(bagId)
  const object = getAddressFromBenkAggResponse(data)
  // GeoJSON: first the longitude, then the latitude.
  const [longitude, latitude] =
    object?.adresseerbaarObjectPuntGeometrieWgs84?.coordinates ?? []

  if (latitude === undefined || longitude === undefined) return null

  const { openbareruimteNaam, huisnummer, huisletter, huisnummertoevoeging } =
    object ?? {}
  const suffix = [huisletter, huisnummertoevoeging].filter(Boolean).join("-")

  return (
    <MapView
      latitude={latitude}
      longitude={longitude}
      label={`${openbareruimteNaam} ${huisnummer}${suffix ? `-${suffix}` : ""}`}
    />
  )
}

export default AddressMap
