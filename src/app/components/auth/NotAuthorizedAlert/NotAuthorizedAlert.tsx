import { Alert, themeSpacing } from "@amsterdam/asc-ui"

import { useIsAuthorized, useMe, usePermissions } from "app/state/rest/"
import styled from "styled-components"

const StyledAlert = styled(Alert)`
  margin: ${ themeSpacing(12) } 0
`

const NotAuthorizedAlert = () => {

  const [data] = useIsAuthorized()
  const showUnauthorized = data?.is_authorized === false
  const [meData] = useMe()
  if (meData !== undefined) console.log(meData)
  const [permissions] = usePermissions()
  if (permissions !== undefined) console.log(permissions)

  return showUnauthorized ?
    <StyledAlert level="error">Je bent niet geauthorizeerd. Waarschijnlijk staan de Keycloak groepen gekoppeld aan je ADW account niet goed ingesteld.</StyledAlert> :
    null
}
export default NotAuthorizedAlert