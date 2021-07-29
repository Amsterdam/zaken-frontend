import { useUsersMe } from "app/state/rest/index"

export default () => {
  const response = useUsersMe()
  const permissions = response[0]?.groups
    ?.map(({ permissions }) => permissions)
    .flat()
    .filter((permission, index, arr) => arr.indexOf(permission) === index)
  return [permissions, response[1]] as const
}