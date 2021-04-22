import { useRef } from "react"
import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

import usePanoramaByBagId from "app/state/rest/custom/usePanoramaByBagId/usePanoramaByBagId"
import useRect from "./hooks/useRect"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  width?: number
  aspect?: number
  radius?: number
  fov?: number
}

const Div = styled.div`
  background-color: ${ themeColor("tint", "level2") };
`
const Img = styled.img`
  width: 100%;
`

const PanoramaPreview: React.FC<Props> = ({ bagId, width: w, aspect = 1.5, radius = 180, fov = 80 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const rect = useRect(ref, 100)
  const width = w ?? rect.width
  const height = width !== undefined ? width / aspect : undefined
  const [data] = usePanoramaByBagId(bagId, width, aspect, radius, fov)

  return (
    <Div ref={ ref } style={ { height } }>
      { data ?
        <Img src={ data.url } alt={ `Panorama preview voor BAG: ${ bagId }` } /> :
        null
      }
    </Div>
  )
}

export default PanoramaPreview
