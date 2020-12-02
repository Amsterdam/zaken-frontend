import settings from "./settings"
//import keycloakMock from "./keycloak.mock"
//import isLocalDevelopment from "./isLocalDevelopment"
import Keycloak from "keycloak-js"

/*
const keycloakAvailable = (window as any).Keycloak !== undefined
export const keycloak = keycloakAvailable && isLocalDevelopment === false ?
  new (window as any).Keycloak(settings) :
  keycloakMock
export type Keycloak = typeof keycloak
*/
export const keycloak = new (Keycloak as any)(settings)
export type Keycloak = typeof keycloak

if (process.env.NODE_ENV === "development") {
  (window as any).keycloak = keycloak
}
