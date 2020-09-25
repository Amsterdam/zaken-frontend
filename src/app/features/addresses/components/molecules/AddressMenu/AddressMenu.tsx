import React from "react"
import styled from "styled-components"
import { themeSpacing } from "@datapunt/asc-ui"
import NavBlock from "app/features/addresses/components/atoms/NavBlock/NavBlock"
import to from "app/features/shared/routing/to"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const Menu = styled.menu`
  width: 100%;
  margin:  ${ themeSpacing(4) } 0;
  padding: 0;
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

const AddressMenu: React.FC<Props> = ({ bagId }) =>
  // TODO: Read page title, routing, icons from global config JSON
  <Menu>
    <Ul>
      <li>
        <NavBlock to={ to("/adres/:bagId/detail", { bagId }) } icon="Housing" header="Adres details" />
      </li>
      <li>
        <NavBlock to={ to("/adres/:bagId/personen", { bagId }) } icon="PersonalLogin" header="Persoonsgegevens" />
      </li>
      <li>
        <NavBlock to={ to("/adres/:bagId/vergunningen", { bagId }) } icon="DocumentCheckmark" header="Vergunningen" />
      </li>
      <li>
        <NavBlock to={ to("/adres/:bagId/zaken", { bagId }) } icon="Layers" header="Gerelateerde zaken" />
      </li>
    </Ul>
  </Menu>
export default AddressMenu
