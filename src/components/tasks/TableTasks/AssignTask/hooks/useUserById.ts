import { useUsers } from "@/api/hooks"

export const useUserById = (
  id?: string,
): [components["schemas"]["User"] | undefined, { isBusy: boolean }] => {
  const { data, isLoading: isBusy } = useUsers()
  const user = data?.results?.find((user) => user.id === id)
  return [user, { isBusy }]
}
