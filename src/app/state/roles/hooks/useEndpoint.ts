import { useState, useEffect } from "react"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export default (path: string, method: Method = "POST") => {

  const url = makeApiUrl(path)
  const { token } = useKeycloak()

  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    (async () => {
      const headers = {
        "Access-Control-Request-Headers": "authorization",
        "Access-Control-Request-Method": method,
        "Authorization": `Bearer ${ token }`
      }
      const response = await fetch(url, { method: "OPTIONS", mode: "cors", headers })
      console.log("response", response)
      console.log("response status", response.status)
      const body = await response.text()
      console.log("response body", body)

      setIsAuthorized(true)
    })()
  }, [method, url, token])

  return isAuthorized
}