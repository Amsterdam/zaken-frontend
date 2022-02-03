import { Spinner } from "@amsterdam/asc-ui"
import useHasPermission from "app/state/rest/custom/usePermissions/useHasPermission"

/*
 ** IsAuthorizedWrapper is used to manage permissions.
 ** When user has the appropriate permission, the children will be returned.
 ** When the permission cannot be found or the permission is false, null will be returned.
 */

type Props = {
  permissionNames: Components.Schemas.PermissionsEnum[]
}

const IsAuthorizedWrapper: React.FC<Props> = ({ permissionNames, children }) => {
  const [hasPermission, isBusy] = useHasPermission(permissionNames)

  return (
    isBusy ?
      <Spinner /> :
      hasPermission ?
        <>{ children }</>
      : null
  )
}

export default IsAuthorizedWrapper
