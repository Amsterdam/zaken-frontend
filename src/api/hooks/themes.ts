import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"

export const useCaseThemes = () => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.themes.list(),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedCaseThemeList"]>(
        makeApiUrl("themes"),
      ),
  })
}
