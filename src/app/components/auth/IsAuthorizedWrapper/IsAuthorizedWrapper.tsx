import { Spinner } from "@amsterdam/asc-ui"
import { useHasPermission } from "app/state/rest"

/*
 ** IsAuthorizedWrapper is used to manage permissions.
 ** When user has the appropriate permission, the children will be returned.
 ** When the permission cannot be found or the permission is false, null will be returned.
 */

type Props = {
  permissionName: string
}

const IsAuthorizedWrapper: React.FC<Props> = ({ permissionName, children }) => {
  const [hasPermission, isBusy] = useHasPermission(permissionName)

  return (
    isBusy ?
      <Spinner /> :
      hasPermission ?
        <>{ children }</>
      : null
  )
}

export default IsAuthorizedWrapper
