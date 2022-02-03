import { RouteComponentProps } from "@reach/router"

import NotAuthorizedPage from "app/pages/auth/NotAuthorizedPage"
import useHasPermission from "app/state/rest/custom/usePermissions/useHasPermission"
import SpinnerWrap from "app/components/shared/ConfirmScaffoldForm/components/SpinnerWrap"

type Props = {
  page: React.ComponentType
  permissionNames?: Components.Schemas.PermissionsEnum[]
} & RouteComponentProps

/**
 * The user needs the applicable permission to visit this page.
 */

const AuthorizedPage: React.FC<Props> = ({ page: Page, permissionNames, ...restProps }) => {
  const [hasPermission, isBusy] = useHasPermission(permissionNames)

  if (isBusy) {
    return <SpinnerWrap />
  }
  return (
    hasPermission ? <Page {...restProps} /> : <NotAuthorizedPage />
  )
}

export default AuthorizedPage
