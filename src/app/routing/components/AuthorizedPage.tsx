import { RouteComponentProps } from "@reach/router"

import NotAuthorizedPage from "app/pages/auth/NotAuthorizedPage"
import useHasPermission from "app/state/rest/custom/usePermissions/useHasPermission"
import SpinnerWrap from "app/components/shared/ConfirmScaffoldForm/components/SpinnerWrap"

type Props = {
  page: React.ComponentType
  permissionName?: string
} & RouteComponentProps

/**
 * The user needs the applicable permission to visit this page.
 */

const AuthorizedPage: React.FC<Props> = ({ page: Page, permissionName, ...restProps }) => {
  const [hasPermission, isBusy] = useHasPermission(permissionName)

  return (
    isBusy ?
      <SpinnerWrap /> :
    hasPermission ?
      <Page {...restProps} /> :
      <NotAuthorizedPage />
  )
}

export default AuthorizedPage
