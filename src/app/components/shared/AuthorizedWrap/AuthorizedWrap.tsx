import useEndpoint from "app/state/roles/hooks/useEndpoint"

type Props = {
  children: React.ReactNode
}

const AuthorizedWrap: React.FC<Props> = ({ children }) => {
  const isAuthorized = useEndpoint("cases")
  console.log("isAuthorized", isAuthorized)
  return <>{ children }</>
}

export default AuthorizedWrap