import React from "react"

import usePanoramaByBagId from "app/state/rest/custom/usePanoramaByBagId/usePanoramaByBagId"

type Props = {
  width?: number
  radius?: number
  bagId: string
}

const imgStyle = {
  maxWidth: "100%"
}

const PanoramaPreview: React.FC<Props> = ({ bagId, width = 600, radius = 180 }) => {
  const { data } = usePanoramaByBagId(bagId, width, radius)
  return data?.url ? <img width={width} src={data?.url} style={imgStyle} alt="Panorama preview of address" /> : null
}

export default PanoramaPreview
