import settings from "./settings"
import Keycloak from "keycloak-js"
import keycloakMock from "./keycloak.mock"
import isLocalDevelopment from "./isLocalDevelopment"
import { env } from "app/config/env"

export const keycloak = env.NODE_ENV !== "test" && isLocalDevelopment === false ? new (Keycloak as any)(settings) : keycloakMock

if (env.NODE_ENV === "development") {
  (window as any).keycloak = keycloak
}
