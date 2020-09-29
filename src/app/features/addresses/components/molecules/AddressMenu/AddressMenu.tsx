import React from "react"
import styled from "styled-components"
import { themeSpacing } from "@datapunt/asc-ui"
import NavBlock from "app/features/addresses/components/atoms/NavBlock/NavBlock"
import to from "app/features/shared/routing/to"
import routesObject from "app/config/routes"

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

const routes = [
  "/adres/:bagId/detail/",
  "/adres/:bagId/personen/",
  "/adres/:bagId/vergunningen/",
  "/adres/:bagId/zaken/"
]

const AddressMenu: React.FC<Props> = ({ bagId }) =>
  // TODO: Read page title, routing, icons from global config JSON
  <Menu>
    <Ul>
      { routes.map(route => {
          const page = routesObject[route]
          if (page?.icon === undefined || page?.title === undefined) return null
          return (
            <li key={ route }>
              <NavBlock to={ to(route, { bagId }) } icon={ page.icon } header={ page.title } />
            </li>
          )
        })
      }
    </Ul>
  </Menu>
export default AddressMenu
