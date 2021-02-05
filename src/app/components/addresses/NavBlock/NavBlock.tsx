import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { Card, CardContent, Icon, Heading, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import * as Assets from "app/components/shared/components/atoms/Icons"

type Props = {
  to: string
  icon: keyof typeof Assets
  header: string
  count?: number
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${ themeColor("tint", "level7") };
  &:hover {
    text-decoration: underline;
  }
`
const StyledCard = styled(Card)`
  height: 162px;
  &:hover {
    box-shadow: 2px 2px ${ themeColor("secondary") };
  }
`
const StyledHeading = styled(Heading)`
  margin-top: ${ themeSpacing(4) };
`

const NavBlock: React.FC<Props> = ({ to: toPath, icon, header, count }) => {
  const Asset = Assets[icon] ?? <span></span>
  return (
    <StyledLink to={ toPath }>
      <StyledCard backgroundColor="level2" shadow>
        <CardContent>
          <Icon size={ 48 }><Asset /></Icon>
          <StyledHeading as="h3">{ header }{ count ? ` (${ count })` : "" }</StyledHeading>
        </CardContent>
      </StyledCard>
    </StyledLink>
  )
}
export default NavBlock
