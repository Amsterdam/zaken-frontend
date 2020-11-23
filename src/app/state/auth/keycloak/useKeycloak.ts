import { useContext } from "react"
import { KeycloakContext } from "./KeycloakProvider"

export default () => {
  const context = useContext(KeycloakContext)
  if (context === undefined) throw new Error("KeycloakContext was not set")
  return context.keycloak
}
