export default {
  "url": "https://iam.amsterdam.nl/auth/",
  "realm": process.env.REACT_APP_KEYCLOAK_REALM ?? "datapunt-ad-acc",
  "ssl-required": "external",
  "resource": "wonen-zaaksysteem-frontend",
  "public-client": true,
  "confidential-port": 0,
  "clientId": "wonen-zaaksysteem-frontend"
}
