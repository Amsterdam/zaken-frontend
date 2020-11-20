import settings from "./settings"

const keycloakAvailable = (window as any).Keycloak !== undefined
export const keycloak = keycloakAvailable ? new (window as any).Keycloak(settings) : {}
export type Keycloak = typeof keycloak

if (process.env.NODE_ENV === "development") {
  (window as any).keycloak = keycloak
}
