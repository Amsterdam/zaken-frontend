import { Skeleton } from "@amsterdam/design-system-react"
import { useBenkAgg } from "@/api/hooks"
import { MapView } from "@/components/MapView/MapView"
import { getAddressFromBenkAggResponse } from "@/app/components/addresses/utils"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
}

/** The address on the map, when the BAG knows where it is. */
// The map has the same shape as the skeleton: 16:9, like the panorama.
const AddressMap: React.FC<Props> = ({ bagId }) => {
  const { data, isLoading } = useBenkAgg(bagId)
  const object = getAddressFromBenkAggResponse(data)
  // GeoJSON: first the longitude, then the latitude.
  const [longitude, latitude] =
    object?.adresseerbaarObjectPuntGeometrieWgs84?.coordinates ?? []

  // The place of the map is taken from the start, like the panorama above it.
  if (isLoading) {
    return (
      <Skeleton>
        <Skeleton.Image aspectRatio="16:9" />
      </Skeleton>
    )
  }
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
