import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { stringifyQueryParams } from "@/api/utils/stringifyQueryParams"
import { useInvalidateLegacyCacheItems } from "@/api/legacyCacheBridge"
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

/**
 * PATCH a task (e.g. its due date). Only refreshes what shows the task: the
 * workflows of its case right away, and the (still old) task lists the next
 * time they're shown. The old useTaskUpdate cleared the whole cases group,
 * which also refetched the case, its events and schedules for nothing.
 */
export const useUpdateTask = (
  taskId: Tasks.TaskId,
  caseId: components["schemas"]["CaseDetail"]["id"],
) => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()
  const invalidateOldCasesItems = useInvalidateLegacyCacheItems("cases")

  return useMutation({
    mutationFn: (data: Partial<components["schemas"]["CaseUserTask"]>) =>
      fetch<components["schemas"]["CaseUserTask"]>(
        makeApiUrl("tasks", taskId),
        {
          method: "PATCH",
          data,
        },
      ),
    onSuccess: async () => {
      invalidateOldCasesItems(makeApiUrl("tasks"))
      await queryClient.invalidateQueries({
        queryKey: queryKeys.cases.workflows(caseId),
      })
    },
  })
}

export type CompleteTaskPayload = {
  case: components["schemas"]["CaseDetail"]["id"]
  case_user_task_id: Tasks.TaskId
  variables: Tasks.WorkflowTask["form_variables"] | null
}

/**
 * Complete a (generic) workflow task. Afterwards, so never before the POST is done:
 * - the workflows of the case refetch (the next task, the new state);
 * - the events refetch (the backend adds a GENERIC_TASK event);
 * - the case itself is only marked stale: its `workflows` field changed, which this
 *   page doesn't show but e.g. the decision form uses, so the next screen refetches it;
 * - the (still old) case and task lists are marked stale.
 */
export const useCompleteTask = (
  caseId: components["schemas"]["CaseDetail"]["id"],
) => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()
  const invalidateOldCasesItems = useInvalidateLegacyCacheItems("cases")

  return useMutation({
    mutationFn: (data: CompleteTaskPayload) =>
      fetch<string>(makeApiUrl("generic-tasks", "complete"), {
        method: "POST",
        data,
      }),
    onSuccess: async () => {
      invalidateOldCasesItems(makeApiUrl("cases", caseId, "events"))
      invalidateOldCasesItems(`${makeApiUrl("cases")}?`)
      invalidateOldCasesItems(makeApiUrl("tasks"))
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.cases.detail(caseId),
          exact: true,
          refetchType: "none",
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.cases.workflows(caseId),
        }),
      ])
    },
  })
}
