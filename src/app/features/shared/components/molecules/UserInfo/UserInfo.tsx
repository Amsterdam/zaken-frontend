import React from "react"
import styled from "styled-components"
import { PermIdentity, Logout } from "app/features/shared/components/atoms/Icons"
import { breakpoint, MenuButton, Icon } from "@amsterdam/asc-ui"

import useKeycloak from "app/state/auth/keycloak/useKeycloak"

type Props = {
  showAsListItem?: boolean
}
type UserProps = {
  onClick: () => void
  userDisplay: string
}

const UserDisplayStyle = styled.div`

  padding: 6px 0 0 24px;
  vertical-align: middle;
  height: 54px;
  
  span {
    display: inline;
    vertical-align: middle;
  }

  svg {
    margin-right: 10px;
  }

  @media screen and ${ breakpoint("min-width", "laptopM") } {
    display: inline-block;
  }
`

const StyledMenuButton = styled(MenuButton)`
  height: 54px; 
  font-weight: normal; 
  padding: 12px 16px 9px;
`

const UserDisplay: React.FC<UserProps> = ({ userDisplay, onClick }) => 
  <>
    { userDisplay &&
      <UserDisplayStyle>
        <Icon size={ 32 }><PermIdentity /></Icon>
        <span>{ userDisplay }</span>
      </UserDisplayStyle>
    }
    <StyledMenuButton
      tabIndex={0}
      onClick={ onClick }
      iconLeft={<Logout/>}
      title="Uitloggen"
      iconSize={24}
    >Uitloggen</StyledMenuButton>
  </>

const UserInfo: React.FC<Props> = ({ showAsListItem = false }) => {
  const keycloak = useKeycloak()
  const onClick = () => keycloak.logout()
  const userDisplay = keycloak.tokenParsed?.name

  return (
    showAsListItem 
      ?
        <li>
          <UserDisplay userDisplay={userDisplay} onClick={onClick} />
        </li>
      :
        <span>
          <UserDisplay userDisplay={userDisplay} onClick={onClick} />
        </span>
  )
}

export default UserInfo
