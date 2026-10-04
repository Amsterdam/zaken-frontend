import NotAuthorizedPage from "app/pages/auth/NotAuthorizedPage"
import useHasPermission from "@/hooks/useHasPermission"
import SpinnerWrap from "./SpinnerWrap"

type Props = {
  page: React.ComponentType
  permissionNames?: components["schemas"]["PermissionsEnum"][]
}

/**
 * The user needs the applicable permission to visit this page.
 */

const AuthorizedPage: React.FC<Props> = ({
  page: Page,
  permissionNames,
  ...restProps
}) => {
  const [hasPermission, isBusy] = useHasPermission(permissionNames)

  if (isBusy) {
    return <SpinnerWrap />
  }
  return hasPermission ? <Page {...restProps} /> : <NotAuthorizedPage />
}

export default AuthorizedPage
