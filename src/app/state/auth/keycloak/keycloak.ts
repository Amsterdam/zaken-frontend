import settings from "./settings"
import keycloakMock from "./keycloak.mock"
import isLocalDevelopment from "./isLocalDevelopment"

const keycloakAvailable = (window as any).Keycloak !== undefined
export const keycloak = keycloakAvailable && isLocalDevelopment === false ?
  new (window as any).Keycloak(settings) :
  keycloakMock
export type Keycloak = typeof keycloak

if (process.env.NODE_ENV === "development") {
  (window as any).keycloak = keycloak
}
