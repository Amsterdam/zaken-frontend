import React, { useRef } from "react"
import styled from "styled-components"
import { themeColor } from "@datapunt/asc-ui"

import usePanoramaByBagId from "app/state/rest/custom/usePanoramaByBagId/usePanoramaByBagId"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  width?: number
  height?: number
  radius?: number
}

const Div = styled.div`
  background-color: ${ themeColor("tint", "level2") };
`
const Img = styled.img`
  max-width: 100%;
`

// TODO: https://codesandbox.io/s/userect-hook-1y5t7?file=/src/useRect.tsx

const PanoramaPreview: React.FC<Props> = ({ bagId, width: w, height, radius = 180 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const width = w ?? ref.current?.getBoundingClientRect().width
  const aspect = width && height ? width / height : 1.5 // default aspect
  const { data } = usePanoramaByBagId(bagId, width, aspect, radius)

  return (
    <Div ref={ ref } style={ { height } }>
      { data ?
        <Img width={ width } src={ data.url } alt={ `Panorama preview voor BAG: ${ bagId }` } /> :
        null
      }
    </Div>
  )
}

export default PanoramaPreview
