import { useCallback } from "react"
import { useAuth } from "react-oidc-context"
import useRequest, { Method } from "./useRequest"
import useNavigation from "app/routing/useNavigation"

import { RequestError } from "./useRequestWrapper"

export default () => {
  const auth = useAuth()
  const request = useRequest()
  const { navigateTo } = useNavigation()

  return useCallback(
    async <Schema>(method: Method, url: string, data?: unknown, additionalHeaders = {}) => {
      try {
        // Update the access token when it expires in less than 30 seconds
        const token = auth.user?.access_token
        const headers = {
          Authorization: `Bearer ${ token }`,
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
          // case 401: auth.signoutRedirect(); break
          case 403: navigateTo("/auth"); break
        }
        if (error !== undefined) throw error
      }
    },
    [auth.user?.access_token, request, navigateTo]
  )
}
