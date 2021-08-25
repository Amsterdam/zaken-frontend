import { MenuItem, MenuButton, Hidden } from "@amsterdam/asc-ui"

import routes from "app/routing/routes"
import to from "app/routing/utils/to"
import StyledButtonLink from "./StyledButtonLink"
import IsAuthorizedMenuButton from "./IsAuthorizedMenuButton"

const items = [
  {
    path: "/zaken"
  },
  {
    path: "/taken"
  },
  {
    path: "/invorderingen",
    permissionName: "access_recovery_check" as Components.Schemas.PermissionsEnum
  },
  {
    path: "/hulp",
    hiddenLaptopM: true
  }
]

const MenuItems: React.FC = () => (
  <>
  { items.map(({ path, hiddenLaptopM, permissionName }) => {
      const { title } = routes[`${ path }/`]
      const menuItem = (
        <MenuItem key={ path }>
          { permissionName !== undefined ?
              <IsAuthorizedMenuButton permissionName={ permissionName } title={ title } to={ to(path) } /> :
              <StyledButtonLink to={ to(path) }>
                <MenuButton as="span">{ title }</MenuButton>
              </StyledButtonLink>
          }
        </MenuItem>
      )
      return hiddenLaptopM ? <Hidden minBreakpoint="laptopM" key={ path }>{ menuItem }</Hidden> : menuItem
    })
  }
  </>
)

export default MenuItems
