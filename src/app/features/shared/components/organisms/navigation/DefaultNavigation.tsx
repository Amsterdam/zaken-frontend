import React from "react"
import { MenuInline, MenuItem, MenuButton, MenuFlyOut } from "@datapunt/asc-ui"

const DefaultNavigation: React.FC = () => (
  <MenuInline>
    <MenuItem>
      <MenuButton forwardedAs="a" href="/" active>
        Home
      </MenuButton>
    </MenuItem>
    <MenuFlyOut label="Submenu">
      <MenuItem>
        <MenuButton forwardedAs="a" href="/">
          Egestas
        </MenuButton>
      </MenuItem>
      <MenuItem>
        <MenuButton forwardedAs="a" href="/">
          Ullamcorper Fringilla
        </MenuButton>
      </MenuItem>
    </MenuFlyOut>
    <MenuItem>
      <MenuButton forwardedAs="a" href="/">
        Lorem
      </MenuButton>
    </MenuItem>
    <MenuItem>
      <MenuButton forwardedAs="a" href="/">
        Condimentum Euismod
      </MenuButton>
    </MenuItem>
  </MenuInline>
)

export default DefaultNavigation
