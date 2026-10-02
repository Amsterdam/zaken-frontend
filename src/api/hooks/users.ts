import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"

export const useUsers = () => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedUserList"]>(makeApiUrl("users")),
  })
}

export const useUsersMe = () => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: () =>
      fetch<components["schemas"]["UserDetail"]>(makeApiUrl("users", "me")),
  })
}
