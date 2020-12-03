import React from "react"
import styled from "styled-components"
import { Logout, PersonalLogin } from "@amsterdam/asc-assets"
import { breakpoint, MenuButton } from "@amsterdam/asc-ui"

import useKeycloak from "app/state/auth/keycloak/useKeycloak"

type Props = {
  showAsListItem?: boolean
}
type UserProps = {
  onClick: () => void
  userDisplay: string
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

const StyledMenuButton = styled(MenuButton)`
  height: 54px; 
  font-weight: normal; 
  padding: 12px 16px 9px;
`

const UserDisplay: React.FC<UserProps> = ({ userDisplay, onClick }) => 
  <>
    { userDisplay &&
      <UserDisplayStyle>
        <PersonalLogin width={24} height={24} />
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
