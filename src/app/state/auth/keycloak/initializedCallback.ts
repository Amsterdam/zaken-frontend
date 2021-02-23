import { KeycloakInstance } from "keycloak-js"

import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"
import createAuthHeaders from "app/state/rest/hooks/utils/createAuthHeaders"
import navigateTo from "app/routing/navigateTo"

export default async (keycloak: KeycloakInstance, isAuthenticated: boolean) => {
  if (isAuthenticated === false) return
  const response = await fetch(makeApiUrl("is-authorized"), {
    headers: {
      ...createAuthHeaders(keycloak.token ?? ""),
      "Content-Type": "application/json"
    }
  })
  const { is_authorized } = await response.json()
  if (is_authorized === false) navigateTo("/auth")
}
