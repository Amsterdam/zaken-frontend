import { useBAG, usePanorama } from "../../index"

const usePanoramaByBagId = (bagId: string, width: number | undefined, aspect: number | undefined, radius: number) => {
  const { data } = useBAG(bagId)

  return usePanorama(
    data?.results?.[0]?.centroid[1],
    data?.results?.[0]?.centroid[0],
    width,
    aspect,
    radius,
    { lazy: data?.results?.[0] === undefined || width === undefined }
  )
}

export default usePanoramaByBagId
