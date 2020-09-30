import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { Card, CardContent, Icon, Heading } from "@datapunt/asc-ui"
import * as Assets from "@datapunt/asc-assets"

type Props = {
  to: string
  icon: keyof typeof Assets
  header: string
}

const W = 320
const H = 200
const StyledCard = styled(Card)`
  min-width: ${ W }px;
  min-height: ${ H }px;
`

const NavBlock: React.FC<Props> = ({ to: toPath, icon, header }) => {
  const Asset = Assets[icon] ?? <span></span>
  return (
    <Link to={ toPath }>
      <StyledCard maxWidth={ W } backgroundColor="level2" shadow>
        <CardContent>
          <Icon><Asset /></Icon>
          <Heading as="h5">{ header }</Heading>
        </CardContent>
      </StyledCard>
    </Link>
  )
}
export default NavBlock
