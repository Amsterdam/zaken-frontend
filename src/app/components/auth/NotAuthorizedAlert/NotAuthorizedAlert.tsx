import React from "react"
import { Alert } from "@amsterdam/asc-ui"

import { useIsAuthorized } from "app/state/rest/"

const NotAuthorizedAlert = () => {

  const [data] = useIsAuthorized()
  const showUnauthorized = data?.is_authorized === false

  return showUnauthorized ?
    <Alert level="error">Je bent niet geauthorizeerd. Waarschijnlijk staan de Keycloak groepen gekoppeld aan je ADW account niet goed ingesteld.</Alert> :
    null
}
export default NotAuthorizedAlert