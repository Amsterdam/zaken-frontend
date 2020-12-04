import { useCallback } from "react"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import useRequest from "./useRequest"

type Method = "get" | "post" | "put" | "patch" | "delete"
export default () => {
  const keycloak = useKeycloak()
  const request = useRequest()

  return useCallback(async (method: Method, url: string, data?: unknown, additionalHeaders = {}) => {
    const isUpdated = await keycloak.updateToken(30)
    console.log(isUpdated)
    if (isUpdated) console.log("Keycloak token updated")
    const headers = {
      Authorization: `Bearer ${ keycloak.token }`,
      ...additionalHeaders
    }
    const response = await request(
      method,
      url,
      data,
      headers
    )
    return response
  }, [keycloak, request])
}
