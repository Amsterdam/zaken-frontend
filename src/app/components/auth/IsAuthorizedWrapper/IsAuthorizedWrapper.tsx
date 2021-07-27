import { Spinner } from "@amsterdam/asc-ui"
import { useMe } from "app/state/rest"

/*
 ** IsAuthorizedWrapper is used to manage permissions.
 ** When user has the appropriate permission, the children will be returned.
 ** When the permission cannot be found or the permission is false, null will be returned.
 */

type Props = {
  permissionName: string
}

const IsAuthorizedWrapper: React.FC<Props> = ({ permissionName, children }) => {

  const [me, { isBusy }] = useMe()
  const allPermissions = me?.groups?.map(group => group.permissions).flat() as unknown as string[]
  const permissions = allPermissions?.filter((permission, index, arr) => arr.indexOf(permission) === index)
  console.log(me, permissions)
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
