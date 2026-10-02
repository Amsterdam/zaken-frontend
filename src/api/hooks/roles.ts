import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/api/queryKeys"
import mockData from "__mocked__/data"

/**
 * The backend has no roles endpoint yet, so this returns the mocked roles
 * (just like the old useRoles with isMocked).
 */
export const useRoles = () =>
  useQuery({
    queryKey: queryKeys.roles.all,
    queryFn: () => Promise.resolve(mockData.roles),
    staleTime: Infinity,
  })
