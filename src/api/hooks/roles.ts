import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/api/queryKeys"

const ROLES = [
  "Handhavingsjurist",
  "Projecthandhaver",
  "Projectmedewerker",
  "Toezichthouder",
]

/** The backend has no roles endpoint yet, so this returns a fixed list. */
export const useRoles = () =>
  useQuery({
    queryKey: queryKeys.roles.all,
    queryFn: () => Promise.resolve(ROLES),
    staleTime: Infinity,
  })
