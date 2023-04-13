import settings from "./settings"
import Keycloak from "keycloak-js"
import keycloakMock from "./keycloak.mock"
import isLocalDevelopment from "./isLocalDevelopment"

export const keycloak = process.env.NODE_ENV !== "test" && !isLocalDevelopment ? new (Keycloak as any)(settings) : keycloakMock

if (process.env.NODE_ENV === "development") {
  (window as any).keycloak = keycloak
}
