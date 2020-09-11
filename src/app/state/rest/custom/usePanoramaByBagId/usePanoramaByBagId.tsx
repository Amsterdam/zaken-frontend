import { useBAG, usePanorama } from "../../index"

const usePanoramaByBagId = (bagId: string) => {
  const { data } = useBAG(bagId)

  return usePanorama(
    data?.results?.[0].centroid[1],
    data?.results?.[0].centroid[0],
    { lazy: data === undefined }
  )
}

export default usePanoramaByBagId
