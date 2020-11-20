export default {
  "realm": process.env.REACT_APP_KEYCLOAK_REALM ?? "datapunt-ad-acc",
  "auth-server-url": "https://iam.amsterdam.nl/auth/",
  "ssl-required": "external",
  "resource": "wonen-zaaksysteem-frontend",
  "public-client": true,
  "confidential-port": 0,
  "clientId": "wonen-zaaksysteem-frontend"
}
