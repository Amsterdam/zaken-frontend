import React from "react"
import { MenuItem, MenuButton } from "@datapunt/asc-ui"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"

const MenuItems: React.FC = () => {
  const { keycloak } = useKeycloak()
  const onClick = () => keycloak.logout()
  return (
    <>
      <MenuItem>
        <ButtonLink to={to("/cases")}>
          <MenuButton as="span">Zakenoverzicht</MenuButton>
        </ButtonLink>
      </MenuItem>
      <MenuItem>
        <MenuButton as="span" onClick={ onClick }>Log out</MenuButton>
      </MenuItem>
    </>
  )
}


export default MenuItems
