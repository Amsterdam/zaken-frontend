import React from "react"
import { MenuInline, Button, MenuToggle, breakpoint } from "@datapunt/asc-ui"
import styled from "styled-components"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import { Search, Handicap } from "@datapunt/asc-assets"
import MenuItems from "app/features/shared/components/molecules/navigation/MenuItems"
import UserInfo from "../UserInfo/UserInfo"

type Props = {
  showSearchButton: boolean
}

const SearchButton = styled(Button)`
  background-color: transparent;
`

const ResponsiveMenuInline = styled(MenuInline)`
  display: none;
  @media screen and ${ breakpoint("min-width", "laptopM") } {
    display: flex;
    a {
      height: 100%;
    }
  }
`
const ResponsiveMenuToggle = styled(MenuToggle)`
display: block;
a > span {
  display: block;
}
@media screen and ${ breakpoint("min-width", "laptopM") } {
  display: none;
}
`

const DefaultNavigation: React.FC<Props> = ({ showSearchButton }) => {
  const { token } = useKeycloak()

  if (!token) return null

  return (
    <>
      <ResponsiveMenuInline>
        <MenuItems />
      </ResponsiveMenuInline>
      <ButtonLink to={to("/hulp")}>
        <SearchButton size={50} variant="blank" iconSize={20} icon={<Handicap />} />
      </ButtonLink>
      { showSearchButton &&
        <ButtonLink to={to("/zoeken")}>
          <SearchButton size={50} variant="blank" iconSize={20} icon={<Search />} />
        </ButtonLink>
      }
      <ResponsiveMenuToggle align="right">
        <MenuItems />
        <UserInfo showAsListItem={true} />
      </ResponsiveMenuToggle>
    </>
  )
}


export default DefaultNavigation
