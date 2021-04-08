import { FC } from "react"
import type KeycloakTokenParsedExtended from "app/state/auth/keycloak/KeycloakTokenParsedExtended"

import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import UserDisplay from "./UserDisplay"

type Props = {
  showAsListItem?: boolean
}

const UserInfo: FC<Props> = ({ showAsListItem = false }) => {
  const { tokenParsed, logout } = useKeycloak()
  const name = (tokenParsed as KeycloakTokenParsedExtended)?.name
  const userDisplay = <UserDisplay name={ name } onClick={ logout } />

  return showAsListItem ?
    <li>{ userDisplay }</li> :
    <span>{ userDisplay }</span>
}
export default UserInfo
