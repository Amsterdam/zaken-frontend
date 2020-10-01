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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${ themeColor("tint", "level7") };
  &:hover {
    text-decoration: underline;
  }
`
const StyledCard = styled(Card)`
  &:hover {
    box-shadow: 2px 2px ${ themeColor("secondary") };
  }
`
const StyledHeading = styled(Heading)`
  margin-top: ${ themeSpacing(4) };
`

const NavBlock: React.FC<Props> = ({ to: toPath, icon, header }) => {
  const Asset = Assets[icon] ?? <span></span>
  return (
    <StyledLink to={ toPath }>
      <StyledCard backgroundColor="level2" shadow>
        <CardContent>
          <Icon size={ 36 }><Asset /></Icon>
          <StyledHeading as="h3">{ header }</StyledHeading>
        </CardContent>
      </StyledCard>
    </StyledLink>
  )
}
export default NavBlock
