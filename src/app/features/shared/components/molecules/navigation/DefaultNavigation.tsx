import React from "react"
import { MenuInline, Button, MenuToggle, Hidden } from "@amsterdam/asc-ui"
import styled from "styled-components"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import { Search, Help } from "app/features/shared/components/atoms/Icons"
import MenuItems from "app/features/shared/components/molecules/navigation/MenuItems"
import UserInfo from "../UserInfo/UserInfo"

type Props = {
  showSearchButton: boolean
}

const IconButton = styled(Button)`
  background-color: transparent;
`

const DefaultNavigation: React.FC<Props> = ({ showSearchButton }) => {
  const { token } = useKeycloak()

  if (!token) return null

  return (
    <>
      <Hidden maxBreakpoint="laptopM">
        <MenuInline>
          <MenuItems />
        </MenuInline>
      </Hidden>
      <div>
        <Hidden maxBreakpoint="laptopM">
          <ButtonLink to={to("/hulp")}>
            <IconButton size={50} variant="blank" iconSize={28} icon={<Help />} />
          </ButtonLink>
        </Hidden>
        { showSearchButton &&
          <ButtonLink to={to("/zoeken")}>
            <IconButton size={50} variant="blank" iconSize={28} icon={<Search />} />
          </ButtonLink>
        }
      </div>
      <Hidden minBreakpoint="laptopM">
        <MenuToggle align="right">
          <MenuItems />
          <UserInfo showAsListItem={true} />
        </MenuToggle>
      </Hidden>
    </>
  )
}

export default DefaultNavigation
