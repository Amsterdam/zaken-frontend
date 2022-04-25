import { useUsersMe } from "app/state/rest"

export default () => {
  const response = useUsersMe()
  return [response[0]?.permissions, response[1]] as const
}