import Keyloack from "keycloak-js"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"
import createAuthHeaders from "app/state/rest/hooks/utils/createAuthHeaders"

export default async (keycloak: Keyloack, isAuthenticated: boolean) => {
  if (isAuthenticated === false) return
  const response = await fetch(makeApiUrl("is-authorized"), {
    headers: {
      ...createAuthHeaders(keycloak.token ?? ""),
      "Content-Type": "application/json"
    }
  })
  const { is_authorized } = await response.json()
  if (is_authorized === false) {
    // This is not working outside the routing wrapper.
    // navigateTo("/auth")
  }
}
