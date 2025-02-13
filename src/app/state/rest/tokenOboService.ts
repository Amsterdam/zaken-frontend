import { useCallback, useMemo, useState } from "react"
import axios from "axios"
import { useAuth } from "react-oidc-context"
import { oidcConfig } from "app/state/auth/oidc/oidcConfig"

const url = oidcConfig.metadata.token_endpoint
const headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}

export const useOboToken = (scope: string) => {
  const auth = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const data = useMemo(
    () => ({
      grant_type: "refresh_token",
      client_id: oidcConfig.client_id,
      refresh_token: auth.user?.refresh_token,
      scope
    }),
    [auth.user?.refresh_token, scope]
  )

  const fetchOboToken = useCallback(() => {
    setLoading(true)
    return axios
      .post(url, data, { headers })
      .then((response) => {
        const accessToken = response.data.access_token
        setAccessToken(accessToken)
        return accessToken
      })
      .catch((error) => {
        throw error
      })
      .finally(() => {
        setLoading(false)
      })
  }, [data])

  return { fetchOboToken, loading, accessToken }
}
