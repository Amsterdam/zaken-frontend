import React, { useMemo } from "react"
import styled, { keyframes } from "styled-components"
import { themeColor, themeSpacing } from "@datapunt/asc-ui"

type StyledDivProps = {
  width: number
}

const backgroundAnimation = keyframes`
    0% { background-position:40%; }
    50% { background-position:100%; }
    100% { background-position:40%; }
`

const StyledDiv = styled.div<StyledDivProps>`  
  height: ${ themeSpacing(5) };
  width: ${ props => props.width }px;  
  max-width: 100%;
  
  background: linear-gradient(270deg, ${ themeColor("tint", "level3") }, ${ themeColor("tint", "level4") });    
  background-size: 400% 400%;
   
  animation: ${ backgroundAnimation } 4s linear infinite;   
`

const SmallSkeleton: React.FC = () => {
  const width = useMemo(() => Math.round(Math.random() * 100 ) + 100, [])
  return <StyledDiv width={width} />
}

export default SmallSkeleton
