import React from "react"
import { MenuItem, MenuButton } from "@datapunt/asc-ui"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"

const MenuItems: React.FC = () =>
<>
  <MenuItem>
    <ButtonLink to={to("/cases")}>
      <MenuButton as="span">Zakenoverzicht</MenuButton>
    </ButtonLink>
  </MenuItem>
  <MenuItem>
    <ButtonLink to={to("/logout")}>
      <MenuButton as="span">Log out</MenuButton>
    </ButtonLink>
  </MenuItem>
</>


export default MenuItems
