import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { stringifyQueryParams } from "@/api/utils/stringifyQueryParams"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"

export const useTasksReasons = (theme?: string) => {
  const fetch = useApiFetch()
  const queryString = stringifyQueryParams({ thema_name: theme })

  return useQuery({
    queryKey: queryKeys.themes.taskReasonNames(theme),
    queryFn: () =>
      fetch<components["schemas"]["CaseReason"][]>(
        `${makeApiUrl("tasks", "reason-names")}${queryString}`,
      ),
  })
}

export const useTaskNames = (themeName: string | null, role: string | null) => {
  const fetch = useApiFetch()
  const queryString = stringifyQueryParams({
    completed: false,
    theme_name: themeName || undefined,
    role: role || undefined,
  })

  return useQuery({
    queryKey: queryKeys.themes.taskNames(themeName, role),
    queryFn: () =>
      fetch<components["schemas"]["CaseUserTaskTaskName"][]>(
        `${makeApiUrl("tasks", "task-names")}${queryString}`,
      ),
  })
}

export const useTaskOwners = () => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.themes.taskOwners(),
    queryFn: () =>
      fetch<components["schemas"]["User"][]>(makeApiUrl("tasks", "owners")),
  })
}
