import BlockMenu from "app/components/shared/BlockMenu/BlockMenu"
import NavBlock from "app/components/addresses/NavBlock/NavBlock"
import to from "app/routing/utils/to"
import routesObject from "app/routing/routes"
import { useCasesByBagId, usePermitDetails } from "app/state/rest"
import { useResidents } from "app/state/rest/"
import MockWrapper from "app/components/shared/MockWrapper/MockWrapper"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const routes = [
  "/adres/:bagId/details/",
  { path: "/adres/:bagId/personen/", permissionName: "access_personal_data_register" as Components.Schemas.PermissionsEnum },
  "/adres/:bagId/vergunningen/",
  "/adres/:bagId/zaken/"
]

const mockedRoutes = [
  "/adres/:bagId/personen/"
]

const AddressMenu: React.FC<Props> = ({ bagId }) => {
  const [permitDetails] = usePermitDetails(bagId)
  const [residents] = useResidents(bagId)
  const [data] = useCasesByBagId(bagId)
  const numCases = data?.results?.length ?? 0
  const permitsGranted = permitDetails?.permits.filter(p => p.permit_granted === "GRANTED").length
  const permitsFound = permitDetails?.permits.filter(p => ["GRANTED", "NOT_GRANTED"].includes(p.permit_granted)).length
  const counts = [
    undefined,
    residents?.results.length,
    permitsFound === permitsGranted ? permitsGranted : permitsGranted + "/" + permitsFound,
    numCases
  ]

  return (
    <BlockMenu>
      <ul>
        { routes.map((route, index) => {
            const path = typeof route === "string" ? route : route.path
            const permissionName = typeof route !== "string" ? route.permissionName : undefined
            const page = routesObject[path]
            if (page?.icon === undefined || page?.title === undefined) return null
            const navBlock = <NavBlock
              to={ to(path, { bagId }) }
              icon={ page.icon }
              header={ page.title }
              count={ counts[index] }
              permissionName={ permissionName }
            />
            return (
              <li key={ path }>
                <div>
                  { mockedRoutes.includes(path) ?
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
