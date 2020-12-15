import { KeycloakTokenParsed } from "keycloak-js"
type KeycloakTokenParsedExtended =
  KeycloakTokenParsed &
  {
    name: string
    email: string
    preferred_username: string
  }
export default KeycloakTokenParsedExtended
