import React from "react"
import { MenuItem, MenuButton, Hidden } from "@datapunt/asc-ui"

import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"

const MenuItems: React.FC = () => (
    <>
      <MenuItem>
        <ButtonLink to={to("/cases")}>
          <MenuButton as="span">Zakenoverzicht</MenuButton>
        </ButtonLink>
        <Hidden minBreakpoint="laptopM">
          <ButtonLink to={to("/hulp")}>
            <MenuButton as="span">Hulp</MenuButton>
          </ButtonLink>
        </Hidden>
      </MenuItem>
    </>
  )


export default MenuItems
