import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import {
  useInvalidateLegacyCacheItems,
  useUpdateLegacyCacheItem,
} from "@/api/legacyCacheBridge"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"

type CaseId = components["schemas"]["CaseDetail"]["id"]

export const useCase = (caseId?: CaseId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.cases.detail(caseId),
    queryFn: () => fetch<CaseItem>(makeApiUrl("cases", caseId)),
    enabled: caseId !== undefined,
  })
}

/**
 * PATCH the case (tags, subjects) without refetching anything:
 * - the cached case gets tags and subjects from the response (the PATCH
 *   serializer uses the same Tag- and SubjectSerializer as the GET);
 * - the timeline's CASE event gets the new subject names, because the backend
 *   reads those live from the case (Case.__get_event_values__);
 * - the (still old) case and task lists, which can be filtered on tag and
 *   subject, are marked stale: they reload the next time they are shown.
 */
export const useUpdateCase = (caseId: CaseId) => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()
  const updateOldCasesItem = useUpdateLegacyCacheItem("cases")
  const invalidateOldCasesItems = useInvalidateLegacyCacheItems("cases")

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      fetch<CaseItem>(makeApiUrl("cases", caseId), { method: "PATCH", data }),
    onSuccess: ({ tags, subjects }) => {
      queryClient.setQueryData<CaseItem>(
        queryKeys.cases.detail(caseId),
        (caseItem) => caseItem && { ...caseItem, tags, subjects },
      )
      updateOldCasesItem<components["schemas"]["CaseEvent"][]>(
        makeApiUrl("cases", caseId, "events"),
        (events) => {
          const event = events.find(({ type }) => type === "CASE")
          if (!event) return
          ;(event.event_values as Record<string, unknown>).subjects =
            subjects.map(({ name }) => name)
        },
      )
      invalidateOldCasesItems(`${makeApiUrl("cases")}?`)
      invalidateOldCasesItems(makeApiUrl("tasks"))
    },
  })
}

/**
 * Optimistically replaces the cached case, e.g. after a related resource
 * (like the address) changed. Replaces the old useCase().updateCache.
 */
export const useSetCaseData = (caseId: CaseId) => {
  const queryClient = useQueryClient()

  return (updater: (caseItem: CaseItem) => CaseItem) =>
    queryClient.setQueryData<CaseItem>(
      queryKeys.cases.detail(caseId),
      (caseItem) => (caseItem ? updater(caseItem) : caseItem),
    )
}

const MAX_POLL_ATTEMPTS = 5

type WorkflowsState = {
  data?: Tasks.PaginatedWorkflowList
  status: "pending" | "error" | "success"
}

// No workflows yet: an empty list, or no list at all because fetching failed
// (the old usePollingRefetch polled in both cases too).
const hasNoWorkflowsYet = ({ data, status }: WorkflowsState) =>
  data === undefined ? status === "error" : data.results.length === 0

/**
 * The workflows of a case. With pollWhileEmpty it keeps fetching while there are
 * none yet, because the backend creates them asynchronously (Celery): 1s, 2s, 4s,
 * 8s, 16s, counted from when the component mounted (like the old usePollingRefetch).
 * isPolling stays true until the last attempt is done, so the UI can keep showing
 * it's loading.
 */
export const useCaseWorkflows = (
  caseId: CaseId,
  options?: { pollWhileEmpty?: boolean },
) => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()
  const queryKey = queryKeys.cases.workflows(caseId)
  const pollWhileEmpty = options?.pollWhileEmpty ?? false

  // Every finished fetch counts as an attempt, also a failed one: otherwise a failing
  // endpoint would be polled forever (and show an error message every time).
  const countFetches = (state?: {
    dataUpdateCount: number
    errorUpdateCount: number
  }) => (state ? state.dataUpdateCount + state.errorUpdateCount : 0)

  // Fetches done before this component mounted don't count as poll attempts.
  const [fetchesBeforeMount] = useState(() =>
    Math.max(countFetches(queryClient.getQueryState(queryKey)), 1),
  )
  const getPollAttempt = (fetchCount: number) => fetchCount - fetchesBeforeMount
  const shouldPoll = (state: WorkflowsState, fetchCount: number) =>
    pollWhileEmpty &&
    hasNoWorkflowsYet(state) &&
    getPollAttempt(fetchCount) < MAX_POLL_ATTEMPTS

  const query = useQuery({
    queryKey,
    queryFn: () =>
      fetch<Tasks.PaginatedWorkflowList>(
        makeApiUrl("cases", caseId, "workflows"),
      ),
    refetchInterval: ({ state }) =>
      shouldPoll(state, countFetches(state))
        ? 1000 * 2 ** getPollAttempt(countFetches(state))
        : false,
    // No error message: while polling the table shows it's loading, and after
    // that "Geen taken beschikbaar" with "Herlaad taken.".
    meta: { globalErrorToast: false },
  })

  const isPolling = shouldPoll(
    query,
    countFetches(queryClient.getQueryState(queryKey)),
  )

  return { ...query, isPolling }
}

/**
 * Updates the owner of one task in the cached workflows of a case, so the
 * table shows the new owner right away. Replaces useContextCache in
 * Workflow/columns.
 */
export const useSetWorkflowTaskOwner = (caseId: CaseId) => {
  const queryClient = useQueryClient()

  return (
    taskId: Tasks.WorkflowTask["case_user_task_id"],
    owner: string | null,
  ) =>
    queryClient.setQueryData<Tasks.PaginatedWorkflowList>(
      queryKeys.cases.workflows(caseId),
      (data) =>
        data && {
          ...data,
          results: data.results.map((workflow) => ({
            ...workflow,
            tasks: workflow.tasks.map((task) =>
              task.case_user_task_id === taskId ? { ...task, owner } : task,
            ),
          })),
        },
    )
}
