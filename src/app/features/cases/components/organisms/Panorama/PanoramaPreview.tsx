import React from "react"

import usePanoramaByBagId from "app/state/rest/custom/usePanoramaByBagId/usePanoramaByBagId"

type Props = {
  bagId: string
}

const PanoramaPreview: React.FC<Props> = ({ bagId }) => {
  const { data } = usePanoramaByBagId(bagId)
  return data?.url ? <img alt="Panorama preview of address" src={data?.url} /> : null
}

export default PanoramaPreview
