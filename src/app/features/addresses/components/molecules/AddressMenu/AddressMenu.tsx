import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { Card, CardContent, Icon, Heading, TopTaskLink, themeSpacing } from "@datapunt/asc-ui"
import { Housing, PersonalLogin, DocumentCheckmark, Layers } from "@datapunt/asc-assets"
import to from "app/features/shared/routing/to"

const Menu = styled.menu`
  margin: 0;
  margin-top:  ${ themeSpacing(4) };
  padding: 0
`
const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  li {
    margin-bottom: ${ themeSpacing(4) };
  }
`

const W = 220
const style = {
  minWidth: W,
  maxWidth: W,
  minHeight: 132
}

const AddressMenu: React.FC = () =>
  <Menu>
    <Ul>
      <li>
        <Link to={ to("detail") }>
          <Card maxWidth={ W } backgroundColor="level2" shadow>
            <CardContent>
              <Icon><Housing /></Icon>
              <Heading as="h5">Adres details</Heading>
            </CardContent>
          </Card>
        </Link>
      </li>
      <li><Link to="personen"><TopTaskLink title="Persoonsgegevens" icon={ PersonalLogin } style={ style } /></Link></li>
      <li><Link to="vergunningen"><TopTaskLink title="Vergunningen" icon={ DocumentCheckmark } style={ style } /></Link></li>
      <li><Link to="zaken"><TopTaskLink title="Gerelateerde zaken" icon={ Layers } style={ style } /></Link></li>
    </Ul>
  </Menu>
export default AddressMenu
