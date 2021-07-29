import { RouteComponentProps } from "@reach/router"

import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import AuthorizedPage from "./AuthorizedPage"

type Props = {
  page: React.ComponentType
  permissionName?: string
} & RouteComponentProps

/**
 * The user needs to be logged on to visit this route
 */
const ProtectedPage: React.FC<Props> = (props) => {
  const { page: Page, permissionName, ...restProps } = props
  const { token } = useKeycloak()
  
  return (
    token
    ? permissionName 
    ? <AuthorizedPage {...props} /> 
    : <Page {...restProps} />
    : null
  )
}

export default ProtectedPage
