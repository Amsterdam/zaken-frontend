import React from "react"
import styled from "styled-components"
import { Icon, themeColor, ascDefaultTheme } from "@datapunt/asc-ui"
import * as Assets from "@datapunt/asc-assets"

type Props = {
  icon: keyof typeof Assets
  color?: string
  size?: number
}

type StyledIconProps = { color: string }
const StyledIcon = styled(Icon)<StyledIconProps>`
  border: 1px solid ${ props => props.color };
  border-radius: 50%;
  padding: 3px;
`

const CircleIcon: React.FC<Props> = ({ icon, color, size = 11 }) => {
  const Asset = Assets[icon]
  return <StyledIcon size={ size } color={ color ?? themeColor("tint", "level7")({ theme: ascDefaultTheme }) }><Asset /></StyledIcon>
}
export default CircleIcon
