import useKeycloak from "app/state/auth/keycloak/useKeycloak"

export default () => {
  const { token } = useKeycloak()
  return token ? { Authorization: `Bearer ${ token }` } : undefined
}
