import BlockMenu from "app/components/shared/BlockMenu/BlockMenu"
import NavBlock from "app/components/addresses/NavBlock/NavBlock"
import to from "app/routing/utils/to"
import routesObject from "app/routing/routes"
import { usePermitDetails } from "app/state/rest"
import { useResidents } from "app/state/rest/"
import MockWrapper from "app/components/shared/MockWrapper/MockWrapper"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const routes = [
  "/adres/:bagId/details/",
  "/adres/:bagId/personen/",
  "/adres/:bagId/vergunningen/",
  "/adres/:bagId/zaken/"
]

const mockedRoutes = [
  "/adres/:bagId/personen/"
]

const AddressMenu: React.FC<Props> = ({ bagId }) => {
  const [permitDetails] = usePermitDetails(bagId)
  const [residents] = useResidents(bagId)
  const permitsGranted = permitDetails?.permits.filter(p => p.permit_granted === "GRANTED").length
  const permitsFound = permitDetails?.permits.filter(p => ["GRANTED", "NOT_GRANTED"].includes(p.permit_granted)).length
  const counts = [
    undefined,
    residents?.results.length,
    permitsFound === permitsGranted ? permitsGranted : permitsGranted + "/" + permitsFound
  ]

  return (
    <BlockMenu>
      <ul>
        { routes.map((route, index) => {
            const page = routesObject[route]
            if (page?.icon === undefined || page?.title === undefined) return null
            const navBlock = <NavBlock to={ to(route, { bagId }) } icon={ page.icon } header={ page.title } count={ counts[index] }/>
            return (
              <li key={ route }>
                <div>
                  { mockedRoutes.includes(route) ?
                    <MockWrapper hasPadding={ false }>{ navBlock }</MockWrapper> :
                    navBlock
                  }
                </div>
              </li>
            )
          })
        }
      </ul>
    </BlockMenu>
  )
}
export default AddressMenu
