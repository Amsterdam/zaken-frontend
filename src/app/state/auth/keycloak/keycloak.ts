import settings from "./settings"
import Keycloak from "keycloak-js"

export const keycloak = new (Keycloak as any)(settings)
export type Keycloak = typeof keycloak

if (process.env.NODE_ENV === "development") {
  (window as any).keycloak = keycloak
}
