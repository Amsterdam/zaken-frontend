import { Logout, PersonalLogin } from "@datapunt/asc-assets"
import { breakpoint, MenuButton } from "@datapunt/asc-ui"

import useKeycloak from "app/state/auth/keycloak/useKeycloak"

import React from "react"
import styled from "styled-components"

type Props = {
  showAsListItem?: boolean
}

const UserDisplayStyle = styled.div`
  
  flex: 1 0 100%;
  padding: 12px 0 0 24px;

  >span {
    vertical-align: text-top;
  }

  svg {
    margin-right: 10px;
    transform: translateY(2px);
  }

  @media screen and ${ breakpoint("min-width", "laptopM") } {
    display: inline-block;
  }
`
const linkStyle = `{ 
  height: 54px; 
  font-weight: normal; 
  padding: 12px 16px 9px;
}`

const UserInfo: React.FC<Props> = ({ showAsListItem = false }) => {
  const { keycloak } = useKeycloak()
  const onClick = () => keycloak.logout()
  const userDisplay = keycloak.tokenParsed?.name
  const MenuButtonWrap = showAsListItem 
    ? styled.li`a ${ linkStyle }`
    : styled.span`a  ${ linkStyle }`

  return (
    <MenuButtonWrap>
      { userDisplay &&
        <UserDisplayStyle>
          <PersonalLogin width={24} height={24} />
          <span>{ userDisplay }</span>
        </UserDisplayStyle>
      }
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
