import { Spinner } from "@amsterdam/asc-ui"
import usePermissions from "app/state/rest/custom/usePermissions/usePermissions"

/*
 ** IsAuthorizedWrapper is used to manage permissions.
 ** When user has the appropriate permission, the children will be returned.
 ** When the permission cannot be found or the permission is false, null will be returned.
 */

type Props = {
  permissionName: string
}

const IsAuthorizedWrapper: React.FC<Props> = ({ permissionName, children }) => {

  const [permissions, { isBusy }] = usePermissions()
  const hasPermission = permissions?.includes(permissionName)

  return (
    isBusy ?
      <Spinner /> :
      hasPermission ?
        <>{ children }</>
      : null
  )
}

export default IsAuthorizedWrapper
