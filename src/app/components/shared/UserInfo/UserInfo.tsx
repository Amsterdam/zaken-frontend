import { useAuth } from "react-oidc-context"
import UserDisplay from "./UserDisplay"
import { useDecodedToken } from "app/state/auth/oidc/useDecodedToken"

type Props = {
  showAsListItem?: boolean
};

const UserInfo: React.FC<Props> = ({ showAsListItem = false }) => {
  const auth = useAuth()
  const decodedToken = useDecodedToken()

  const userDisplay = (
    <UserDisplay name={decodedToken?.given_name} onClick={auth.signoutRedirect} />
  )

  return showAsListItem ? (
    <li>{userDisplay}</li>
  ) : (
    <span style={{ marginRight: "-20px" }}>{userDisplay}</span>
  )
}
export default UserInfo
