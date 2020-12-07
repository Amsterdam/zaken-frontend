import { useCallback } from "react"
import { navigate } from "@reach/router"

import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import to from "app/features/shared/routing/to"
import useRequest, { Method } from "./useRequest"

export default () => {
  const keycloak = useKeycloak()

  const request = useRequest()

  return useCallback(
    async <Schema>(method: Method, url: string, data?: unknown, additionalHeaders = {}) => {
      try {
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
      } catch (error) {
        switch (error?.response?.status) {
          case 401: keycloak.logout(); break
          case 403: navigate(to("/auth")); break
        }
        throw error
      }
    },
    [keycloak, request]
  )
}
