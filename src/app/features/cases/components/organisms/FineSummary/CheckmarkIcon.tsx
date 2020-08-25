import React from "react"
import styled from "styled-components"
import { Checkmark } from "@datapunt/asc-assets"
import { Icon, themeColor } from "@datapunt/asc-ui"

const StyledIcon = styled(Icon)`
  border: 1px solid ${ themeColor("support", "valid") };
  border-radius: 50%;
  padding: 3px;
`

const CheckmarkIcon: React.FC = () =>
  // TODO: Use @datapunt/asc-ui `themeColor("support", "valid")`
  <StyledIcon size={11} color="#00A03C"><Checkmark/></StyledIcon>
export default CheckmarkIcon
