import { useCallback } from "react"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import useRequest, { Method } from "./useRequest"

export default () => {
  const keycloak = useKeycloak()
  const request = useRequest()

  return useCallback(
    async <Schema>(method: Method, url: string, data?: unknown, additionalHeaders = {}) => {
      await keycloak.updateToken(30)
      const headers = {
        Authorization: `Bearer ${ keycloak.token }`,
        ...additionalHeaders
      }
      const response = await request<Schema>(
        method,
        url,
        data,
        headers
      )
      return response
    },
    [keycloak, request]
  )
}
