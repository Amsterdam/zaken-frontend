import { useBagPdokByBagId, usePanorama } from "@/api/hooks"
import { getAddressFromBagPdokResponse } from "@/components/addresses/utils"

const extractLatLng = (point?: BAGPdokAddress["centroide_ll"]) => {
  // Ensure the string starts with "POINT(" and ends with ")"
  if (point && point.startsWith("POINT(") && point.endsWith(")")) {
    // Remove "POINT(" from the start and ")" from the end
    const coordinates = point.slice(6, -1)
    // Split the coordinates by space
    const [lng, lat] = coordinates.split(" ")
    // Parse the coordinates to floats
    return {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    }
  }
  return null
}

const usePanoramaByBagId = (
  bagId: string,
  width: number | undefined,
  aspect: number | undefined,
  radius: number,
  fov: number | undefined,
) => {
  const { data } = useBagPdokByBagId(bagId)
  const foundAddress = getAddressFromBagPdokResponse(data)
  const latLng = extractLatLng(foundAddress?.centroide_ll)

  return usePanorama(
    { lat: latLng?.lat, lon: latLng?.lng, width, aspect, radius, fov },
    { enabled: foundAddress !== undefined && width !== undefined },
  )
}

export default usePanoramaByBagId
