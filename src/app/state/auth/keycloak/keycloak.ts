const settings = {
  // TODO: Switch between production and acceptance realm
  "realm": "datapunt-ad-acc",
  "auth-server-url": "https://iam.amsterdam.nl/auth/",
  "ssl-required": "external",
  "resource": "wonen-zaaksysteem-frontend",
  "public-client": true,
  "confidential-port": 0,
  "clientId": "wonen-zaaksysteem-frontend"
}

const keycloakAvailable = (window as any).Keycloak !== undefined
export const keycloak = keycloakAvailable ? new (window as any).Keycloak(settings) : {}
export type Keycloak = typeof keycloak
