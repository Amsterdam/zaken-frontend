import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { makeApiUrl } from "@/api/utils/makeApiUrl"

export const useFine = (id?: string) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.fines.detail(id),
    queryFn: () =>
      fetch<components["schemas"]["FineList"]>(makeApiUrl("fines", id)),
    enabled: id !== undefined,
  })
}
