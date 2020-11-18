import { Logout } from "@datapunt/asc-assets"
import { MenuButton } from "@datapunt/asc-ui"

import useKeycloak from "app/state/auth/keycloak/useKeycloak"

import React from "react"
import styled from "styled-components"

type Props = {
  showAsListItem?: boolean
}

const linkStyle = "{ height: 54px"

const UserInfo: React.FC<Props> = ({ showAsListItem = false }) => {
  const { keycloak } = useKeycloak()
  const onClick = () => keycloak.logout()
  const MenuButtonWrap = showAsListItem 
    ? styled.li`a ${ linkStyle }`
    : styled.span`a  ${ linkStyle }`

  return (
    <MenuButtonWrap>
      <MenuButton
        as="a"
        tabIndex={0}
        onClick={ onClick }
        iconLeft={<Logout/>}
        title="Uitloggen"
        iconSize={24}
      >Uitloggen</MenuButton>
    </MenuButtonWrap>
  )
}

export default UserInfo
