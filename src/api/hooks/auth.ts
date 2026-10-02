import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { makeApiUrl } from "@/api/utils/makeApiUrl"

export const useIsAuthorized = () => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.auth.isAuthorized(),
    queryFn: () => fetch<IsAuthorizedResponse>(makeApiUrl("is-authorized")),
  })
}
