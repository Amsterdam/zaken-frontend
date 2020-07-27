import React from "react"
import qs from "qs"
import styled, { css } from "styled-components"

import { useBAG } from "app/state/rest"
import { themeColor, themeSpacing } from "@datapunt/asc-ui"

type Props = {
  bagId: string
  zoom?: number
}

export const iframeCSS = css`
  border: 2px solid ${ themeColor("tint", "level3") };
  flex: 1;
  max-height: 70vh;
  height: 100%;
`

const StyledIFrame = styled.iframe`${ iframeCSS }`
const StyledSkeleton = styled.div`${ iframeCSS }`

const Wrapper = styled.div`    
  padding-bottom: ${ themeSpacing(4) };
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

export const BagMapSkeleton: React.FC = () => (<Wrapper><StyledSkeleton /></Wrapper>)

export default BagMap
