import React from "react"
import styled from "styled-components"
import { MenuItem, MenuButton, Hidden } from "@amsterdam/asc-ui"

import routes from "app/config/routes"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"

const items = [
  {
    path: "/cases",
    hiddenLaptopM: false
  },
  {
    path: "/hulp",
    hiddenLaptopM: true
  }
]

const StyledButtonLink = styled(ButtonLink)`
  span {
    width: 100%;
  }
`

const MenuItems: React.FC = () => (
  <>
  { items.map(({ path, hiddenLaptopM }) => {
      const { title } = routes[`${ path }/`]
      const menuItem = (
        <MenuItem key={ path }>
          <StyledButtonLink to={ to(path) }>
            <MenuButton as="span">
              { title }
            </MenuButton>
          </StyledButtonLink>
        </MenuItem>
      )
      return hiddenLaptopM ? <Hidden minBreakpoint="laptopM" key={ path }>{ menuItem }</Hidden> : menuItem
    })
  }
  </>
)

export default MenuItems
