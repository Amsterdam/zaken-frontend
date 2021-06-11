import BlockMenu from "app/components/shared/BlockMenu/BlockMenu"
import NavBlock from "app/components/addresses/NavBlock/NavBlock"
import to from "app/routing/utils/to"
import routesObject from "app/routing/routes"

const items = [
  "/taken/",
  "/invorderingen/"
]

const HomeMenu: React.FC = () => (
  <BlockMenu>
    <ul>
      { items.map((route) => {
        const page = routesObject[route]
        if (page?.icon === undefined || page?.title === undefined) return null
        const navBlock = <NavBlock to={ to( route ) } icon={ page.icon } header={ page.title } />
        return (
          <li key={ route }>
            <div>
              { navBlock }
            </div>
          </li>
        )
        })
      }
    </ul>
  </BlockMenu>
)

export default HomeMenu
