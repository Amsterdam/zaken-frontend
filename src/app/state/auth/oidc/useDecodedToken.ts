import { useAuth } from "react-oidc-context"
import { jwtDecode } from "jwt-decode"

export type DecodedToken = {
  given_name: string  // firstname
  family_name: string // lastname
  name: string        // lastname, firstname
  unique_name: string // email
  [key: string]: number | string | string[]
}

export const useDecodedToken = (): DecodedToken | undefined => {
  const auth = useAuth()
  const token = auth.user?.access_token

  if (!token) return

  const decoded = jwtDecode<DecodedToken>(token)
  return decoded
}
