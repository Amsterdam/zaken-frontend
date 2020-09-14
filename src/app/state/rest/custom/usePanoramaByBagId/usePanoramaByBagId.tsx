import { useBAG, usePanorama } from "../../index"

const usePanoramaByBagId = (bagId: string, width: number) => {
  const { data } = useBAG(bagId)

  return usePanorama(
    data?.results?.[0].centroid[1],
    data?.results?.[0].centroid[0],
    width,
    { lazy: data === undefined }
  )
}

export default usePanoramaByBagId
