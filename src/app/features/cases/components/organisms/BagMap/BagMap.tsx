import React from "react"
import qs from "qs"
import styled from "styled-components"


import { useBAG } from "app/state/rest"

type Props = {
  bagId: string
  zoom?: number
}

const StyledIFrame = styled.iframe`
  border: none;
  flex: 1;
  max-height: 70vh;
  height: 100%;
`

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const BagMap: React.FC<Props> = ({ bagId, zoom = 20 }) => {
  const { data } = useBAG(bagId)

  if (data === undefined) {
    return null
  }
  
  const location = [...data.results[0].centroid].reverse().join(",")

  const queryString = qs.stringify({
    q: location,
    z: zoom,
    output: "embed"
  })
  
  return (
    <Wrapper>
      <StyledIFrame src={`https://maps.google.com/maps?${ queryString }`} width="100%" height="270" />
    </Wrapper>
  )
}

export default BagMap
