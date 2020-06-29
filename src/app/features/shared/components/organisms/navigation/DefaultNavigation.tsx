import React from "react"
import { MenuInline, MenuItem, MenuButton, MenuFlyOut } from "@datapunt/asc-ui"

import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"

const DefaultNavigation: React.FC = () => (
  <MenuInline>
    <MenuItem>
      <ButtonLink to={to("/")}>
        <MenuButton as="span" active>Home</MenuButton>
      </ButtonLink>
    </MenuItem>
    <MenuFlyOut label="Zaken">
      <MenuItem>
        <ButtonLink to={to("/cases")}>
          <MenuButton as="span">Overzicht</MenuButton>
        </ButtonLink>
      </MenuItem>
      <MenuItem>
        <MenuButton forwardedAs="a" href={ to("/", { bar: "foo" }) }>
          Foo Ullamcorper Fringilla
        </MenuButton>
      </MenuItem>
    </MenuFlyOut>
    <MenuItem>
      <MenuButton forwardedAs="a" href={ to("/") }>
        Lorem
      </MenuButton>
    </MenuItem>
    <MenuItem>
      <MenuButton forwardedAs="a" href={ to("/") }>
        Condimentum Euismod
      </MenuButton>
    </MenuItem>
  </MenuInline>
)

export default DefaultNavigation
