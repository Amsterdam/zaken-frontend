import React from "react"

import usePanoramaByBagId from "app/state/rest/custom/usePanoramaByBagId/usePanoramaByBagId"

type Props = {
  width: number
  bagId: string
}

const PanoramaPreview: React.FC<Props> = ({ bagId, width }) => {
  const { data } = usePanoramaByBagId(bagId, width)
  return data?.url ? <img width={width} src={data?.url} alt="Panorama preview of address" /> : null
}

export default PanoramaPreview
