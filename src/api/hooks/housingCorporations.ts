import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"

export const useCorporations = () => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.housingCorporations.list(),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedHousingCorporationList"]>(
        makeApiUrl("addresses", "housing-corporations"),
      ),
  })
}
