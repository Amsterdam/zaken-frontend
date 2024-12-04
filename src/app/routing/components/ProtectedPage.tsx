import { useAuth } from "react-oidc-context"
import AuthorizedPage from "./AuthorizedPage"

type Props = {
  page: React.ComponentType
  permissionNames?: Components.Schemas.PermissionsEnum[]
}

/**
 * The user needs to be logged on to visit this route
 */
const ProtectedPage: React.FC<Props> = (props) => {
  const auth = useAuth()
  const token = auth.user?.id_token

  if (token === undefined) return null

  const { page: Page, permissionNames, ...restProps } = props

  return (
    permissionNames !== undefined
      ? <AuthorizedPage { ...props } />
      : <Page { ...restProps } />
  )
}

export default ProtectedPage
