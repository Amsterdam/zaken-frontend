import { useBAG, usePanorama } from "app/state/rest/index"
import getAddressFromBagResults from "app/components/addresses/utils/getAddressFromBagResults"

const usePanoramaByBagId = (bagId: string, width: number | undefined, aspect: number | undefined, radius: number, fov: number | undefined) => {
  const [data] = useBAG(bagId)
  const foundAddress = getAddressFromBagResults(data)

  return usePanorama(
    foundAddress?.centroid[1],
    foundAddress?.centroid[0],
    width,
    aspect,
    radius,
    fov,
    { lazy: foundAddress === undefined || width === undefined }
  )
}

export default usePanoramaByBagId
