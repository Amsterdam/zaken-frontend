import { FC } from "react"
import { MenuInline, Button, MenuToggle, Hidden } from "@amsterdam/asc-ui"
import styled from "styled-components"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import { Search, Help } from "app/components/shared/Icons"
import MenuItems from "app/components/shared/navigation/MenuItems"
import UserInfo from "../UserInfo/UserInfo"

type Props = {
  showSearchButton: boolean
}

const IconButton = styled(Button)`
  background-color: transparent;
`

const DefaultNavigation: FC<Props> = ({ showSearchButton }) => {
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
          <ButtonLink to={to("/hulp")} title="Help">
            <IconButton size={50} variant="blank" iconSize={28} icon={<Help />} tabIndex={-1}>
              </IconButton>
          </ButtonLink>
        </Hidden>
        { showSearchButton &&
          <ButtonLink to={to("/")} title="Zoeken">
            <IconButton size={50} variant="blank" iconSize={28} icon={<Search />} tabIndex={-1}/>
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
