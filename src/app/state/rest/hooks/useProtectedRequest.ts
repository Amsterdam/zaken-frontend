import { useCallback } from "react"

import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import useRequest, { Method } from "./useRequest"
import useNavigation from "app/routing/useNavigation"

import { RequestError } from "./useRequestWrapper"

export default () => {
  const keycloak = useKeycloak()
  const request = useRequest()
  const { navigateTo } = useNavigation()

  return useCallback(
    async <Schema>(method: Method, url: string, data?: unknown, additionalHeaders = {}) => {
      try {
        // Update the access token when it expires in less than 30 seconds
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
        switch ((error as RequestError)?.response?.status) {
          case 401: keycloak.logout(); break
          case 403: navigateTo("/auth"); break
        }
        if (error !== undefined) throw error
      }
    },
    [keycloak, request, navigateTo]
  )
}
