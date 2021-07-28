import { Alert, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"
import { useIsAuthorized } from "app/state/rest/"

const StyledAlert = styled(Alert)`
  margin: ${ themeSpacing(12) } 0
`

const NotAuthorizedAlert: React.FC = () => {

  const [data] = useIsAuthorized()
  const showUnauthorized = data?.is_authorized === false

  return showUnauthorized ?
    <StyledAlert level="error">Je bent niet geauthorizeerd. Waarschijnlijk staan de Keycloak groepen gekoppeld aan je ADW account niet goed ingesteld.</StyledAlert> :
    null
}
export default NotAuthorizedAlert