import React from "react"
import { MenuInline, MenuItem, MenuButton, Button } from "@datapunt/asc-ui"
import styled from "styled-components"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
import { hasToken } from "app/state/auth/tokenStore"
import { Search } from "@datapunt/asc-assets"

type Props = {
  showSearchButton: boolean
}

const SearchButton = styled(Button)`
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
`

const DefaultNavigation: React.FC<Props> = ({ showSearchButton }) =>
  hasToken()
    ? <>
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
        { showSearchButton && 
        <ButtonLink to={to("/zoeken")}>
          <SearchButton size={50} variant="blank" iconSize={20} icon={<Search />} />
        </ButtonLink>
        }
      </>
    : null


export default DefaultNavigation
