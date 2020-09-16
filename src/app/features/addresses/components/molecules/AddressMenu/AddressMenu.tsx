import React from "react"
import styled from "styled-components"
import { themeSpacing } from "@datapunt/asc-ui"
import NavBlock from "app/features/addresses/components/atoms/NavBlock/NavBlock"

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

const AddressMenu: React.FC = () =>
  // TODO: Read page title, routing, icons from global config JSON
  <Menu>
    <Ul>
      <li>
        <NavBlock to="detail" icon="Housing" header="Adres details" />
      </li>
      <li>
        <NavBlock to="personen" icon="PersonalLogin" header="Persoonsgegevens" />
      </li>
      <li>
        <NavBlock to="vergunningen" icon="DocumentCheckmark" header="Vergunningen" />
      </li>
      <li>
        <NavBlock to="zaken" icon="Layers" header="Gerelateerde zaken" />
      </li>
    </Ul>
  </Menu>
export default AddressMenu
