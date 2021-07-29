import { RouteComponentProps } from "@reach/router"
import { Spinner } from "@amsterdam/asc-ui"

import NotAuthorizedPage from "app/pages/auth/NotAuthorizedPage"
import { usePermissions } from "app/state/rest"

type Props = {
  page: React.ComponentType
  permissionName?: keyof MockComponents.Schemas.Permissions["permissions"]
} & RouteComponentProps

/**
 * The user needs the applicable permission to visit this route.
 */
const AuthorizedPage: React.FC<Props> = ({ page: Page, permissionName, ...restProps }) => {
  console.log("permissionName", permissionName)
  const [permissions, { isBusy }] = usePermissions()
  const hasPermission = permissionName ? permissions?.permissions[permissionName] : false

  return (
    isBusy ?
      <Spinner /> :
      hasPermission ?
        <Page {...restProps} />
      : <NotAuthorizedPage />
  )
}

export default AuthorizedPage
