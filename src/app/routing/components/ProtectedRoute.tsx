import { FC, ComponentType } from "react"
import { RouteComponentProps } from "@reach/router"

import useKeycloak from "app/state/auth/keycloak/useKeycloak"

type Props = {
  page: ComponentType
} & RouteComponentProps

/**
 * The user needs to be logged on to visit this route
 */
const ProtectedRoute: FC<Props> = ({ page: Page, ...restProps }) => {
  const { token } = useKeycloak()

  return token
    ? <Page {...restProps} />
    : null
}

export default ProtectedRoute
