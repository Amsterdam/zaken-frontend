import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { Card, CardContent, Icon, Heading, themeColor, themeSpacing } from "@datapunt/asc-ui"
import * as Assets from "@datapunt/asc-assets"

type Props = {
  to: string
  icon: keyof typeof Assets
  header: string
}

const W = 320
const H = 200
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${ themeColor("tint", "level7") };
`
const StyledCard = styled(Card)`
  min-width: ${ W }px;
  min-height: ${ H }px;
`
const StyledHeading = styled(Heading)`
  margin-top: ${ themeSpacing(3) };
`

const NavBlock: React.FC<Props> = ({ to: toPath, icon, header }) => {
  const Asset = Assets[icon] ?? <span></span>
  return (
    <StyledLink to={ toPath }>
      <StyledCard maxWidth={ W } backgroundColor="level2" shadow>
        <CardContent>
          <Icon size={ 48 }><Asset /></Icon>
          <StyledHeading as="h3">{ header }</StyledHeading>
        </CardContent>
      </StyledCard>
    </StyledLink>
  )
}
export default NavBlock
