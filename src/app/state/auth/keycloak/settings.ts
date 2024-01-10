import { env } from "app/config/env"

export default {
  "url": "https://iam.amsterdam.nl/auth/",
  "realm": env.REACT_APP_KEYCLOAK_REALM ?? "",
  "ssl-required": "external",
  "resource": "wonen-woon-o-azure",
  "public-client": true,
  "confidential-port": 0,
  "clientId": "wonen-woon-o-azure"
}
