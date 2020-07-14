import React from "react"
import { MenuInline, MenuItem, MenuButton } from "@datapunt/asc-ui"

import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"

const DefaultNavigation: React.FC = () => (
  <MenuInline>
    <MenuItem>
      <ButtonLink to={to("/cases")}>
        <MenuButton as="span">Zaken</MenuButton>
      </ButtonLink>
    </MenuItem>
    <MenuItem>
      <ButtonLink to={to("/logout")}>
        <MenuButton as="span">Log out</MenuButton>
      </ButtonLink>
    </MenuItem>
  </MenuInline>
)

export default DefaultNavigation
