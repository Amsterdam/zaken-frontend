import React from "react"
import styled from "styled-components"
import { themeSpacing, breakpoint } from "@datapunt/asc-ui"
import NavBlock from "app/features/addresses/components/atoms/NavBlock/NavBlock"
import to from "app/features/shared/routing/to"
import routesObject from "app/config/routes"
import { usePermitDetails } from "app/state/rest"
import useResidentsByBagId from "app/state/rest/custom/useResidentsByBagId/useResidentsByBagId"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}
const Menu = styled.menu`
  width: 100%;
  margin: 0;
  padding: 0;
`
const Ul = styled.ul`
  margin: 0 -${ themeSpacing(1.5) };
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`
const Li = styled.li`
  display: inline-block;
  width: 100%;
  margin-bottom: ${ themeSpacing(3) };
  @media screen and ${ breakpoint("min-width", "tabletS") } {
    width: 50%;
  }
  @media screen and ${ breakpoint("min-width", "laptop") } {
    width: 25%;
  }
`
const Div = styled.div`
  margin: 0 ${ themeSpacing(1.5) };
`

const routes = [
  "/adres/:bagId/detail/",
  "/adres/:bagId/personen/",
  "/adres/:bagId/vergunningen/",
  "/adres/:bagId/zaken/"
]

const AddressMenu: React.FC<Props> = ({ bagId }) => {
  const { data: permitDetails } = usePermitDetails(bagId)
  // TODO: Do show Residents by BAG_id
  const { data: residents } = useResidentsByBagId(bagId)
  const counts = [undefined, residents?.results.length, permitDetails?.length]

  return (
    <Menu>
      <Ul>
        { routes.map((route, index) => {
            const page = routesObject[route]
            if (page?.icon === undefined || page?.title === undefined) return null
            return (
              <Li key={ route }>
                <Div>
                  <NavBlock to={ to(route, { bagId }) } icon={ page.icon } header={ page.title } count={ counts[index] }/>
                </Div>
              </Li>
            )
          })
        }
      </Ul>
    </Menu>
  )
}
export default AddressMenu
