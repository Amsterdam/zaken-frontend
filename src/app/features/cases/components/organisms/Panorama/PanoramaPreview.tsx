import React from "react"

import usePanoramaByBagId from "app/state/rest/custom/usePanoramaByBagId/usePanoramaByBagId"

type Props = {
  width?: number
  radius?: number
  bagId: string
}

const PanoramaPreview: React.FC<Props> = ({ bagId, width = 600, radius = 180 }) => {
  const { data } = usePanoramaByBagId(bagId, width, radius)
  return data?.url ? <img width={width} src={data?.url} alt="Panorama preview of address" /> : null
}

export default PanoramaPreview
