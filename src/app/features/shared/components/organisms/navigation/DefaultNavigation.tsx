import React from "react"
import { MenuInline, MenuItem, MenuButton, MenuFlyOut } from "@datapunt/asc-ui"

import to from "app/features/shared/routing/to"

const DefaultNavigation: React.FC = () => (
  <MenuInline>
    <MenuItem>
      <MenuButton forwardedAs="a" href={ to("/") } active>
        Home
      </MenuButton>
    </MenuItem>
    <MenuFlyOut label="Submenu">
      <MenuItem>
        <MenuButton forwardedAs="a" href={ to("/poc/foo/:bar/", { bar: "bar" }) }>
          Bar Egestas
        </MenuButton>
      </MenuItem>
      <MenuItem>
        <MenuButton forwardedAs="a" href={ to("/poc/foo/:bar/", { bar: "foo" }) }>
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
