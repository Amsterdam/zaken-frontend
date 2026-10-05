import { useCallback } from "react"
import { useAuth } from "react-oidc-context"
import useNavigation from "@/hooks/useNavigation"
import type { ApiError } from "@/api/types/apiError"

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export type ApiFetchOptions = {
  method?: HttpMethod
  data?: unknown
  /**
   * Send the user's token. Set to false for external APIs (PDOK, data.amsterdam.nl):
   * they don't need it, and it must never leave our own API.
   */
  authenticated?: boolean
}

/**
 * Token-bound fetcher for use as a TanStack Query queryFn/mutationFn, since
 * queryFn isn't a component and can't call useAuth() itself.
 */
export const useApiFetch = () => {
  const auth = useAuth()
  const token = auth.user?.access_token
  const { navigateTo } = useNavigation()

  return useCallback(
    async <Schema>(
      url: string,
      { method = "GET", data, authenticated = true }: ApiFetchOptions = {},
    ): Promise<Schema> => {
      const headers: Record<string, string> = {}

      // Like axios did: only with a body, so a plain GET to an external API stays a "simple" CORS request.
      if (data !== undefined) {
        headers["Content-Type"] = "application/json"
      }

      if (authenticated && token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(url, {
        method,
        headers,
        body: data !== undefined ? JSON.stringify(data) : undefined,
      })

      const text = await response.text()
      let json: unknown
      try {
        json = text ? JSON.parse(text) : null
      } catch {
        json = text
      }

      if (!response.ok) {
        // Same as the old useProtectedRequest: the auth page explains the missing permissions.
        if (authenticated && response.status === 403) {
          navigateTo("/auth")
        }

        throw {
          ...(typeof json === "object" && json !== null ? json : {}),
          status: response.status,
          message:
            typeof json === "string" && json ? json : response.statusText,
          url,
        } as ApiError
      }

      return json as Schema
    },
    [token, navigateTo],
  )
}
