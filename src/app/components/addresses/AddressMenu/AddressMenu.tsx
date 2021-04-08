import { FC } from "react"
import styled from "styled-components"
import { themeSpacing, breakpoint } from "@amsterdam/asc-ui"
import NavBlock from "app/components/addresses/NavBlock/NavBlock"
import to from "app/routing/utils/to"
import routesObject from "app/routing/routes"
import { usePermitDetails } from "app/state/rest"
import { useResidents } from "app/state/rest/"
import MockWrapper from "app/components/shared/MockWrapper/MockWrapper"

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
  "/adres/:bagId/details/",
  "/adres/:bagId/personen/",
  "/adres/:bagId/vergunningen/",
  "/adres/:bagId/zaken/"
]

const mockedRoutes = [
  "/adres/:bagId/personen/",
  "/adres/:bagId/vergunningen/"
]

const AddressMenu: FC<Props> = ({ bagId }) => {
  const [permitDetails] = usePermitDetails(bagId)
  // TODO: Do show Residents by BAG_id
  const [residents] = useResidents(bagId)
  const counts = [undefined, residents?.results.length, permitDetails?.length]

  return (
    <Menu>
      <Ul>
        { routes.map((route, index) => {
            const page = routesObject[route]
            if (page?.icon === undefined || page?.title === undefined) return null
            const navBlock = <NavBlock to={ to(route, { bagId }) } icon={ page.icon } header={ page.title } count={ counts[index] }/>
            return (
              <Li key={ route }>
                <Div>
                  { mockedRoutes.includes(route) ?
                    <MockWrapper hasPadding={ false }>{ navBlock }</MockWrapper> :
                    navBlock
                  }
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
