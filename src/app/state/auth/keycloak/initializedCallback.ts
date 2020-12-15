import { navigate } from "@reach/router"
import to from "app/features/shared/routing/to"
import { KeycloakInstance } from "keycloak-js"

import { makeGatewayUrl } from "app/state/rest/hooks/utils/utils"
import createAuthHeaders from "app/state/rest/hooks/utils/createAuthHeaders"

export default async (keycloak: KeycloakInstance, isAuthenticated: boolean) => {
  if (isAuthenticated === false) return
  const response = await fetch(makeGatewayUrl("is-authorized"), {
    headers: {
      ...createAuthHeaders(keycloak.token ?? ""),
      "Content-Type": "application/json"
    }
  })
  const { is_authorized } = await response.json()
  if (is_authorized === false) navigate(to("/auth"))
}
