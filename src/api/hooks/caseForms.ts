import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { makeApiUrl } from "@/api/utils/makeApiUrl"
import { invalidateCaseAndTaskLists } from "./cases"

type CaseId = components["schemas"]["CaseDetail"]["id"]

/**
 * POST of a case form (debrief, decision, summon, visit, ...). These complete a
 * workflow task and/or add events, after which the form navigates back to the
 * case. So everything of this case is marked stale without refetching on the
 * form itself (refetchType "none"): the case page refetches what it shows once
 * it's back. The case and task lists are marked stale too.
 */
const useCaseFormMutation = <Payload, Response = unknown>(
  caseId: CaseId,
  url: string,
) => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Payload) =>
      fetch<Response>(url, { method: "POST", data }),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.cases.detail(caseId),
          refetchType: "none",
        }),
        invalidateCaseAndTaskLists(queryClient),
      ]),
  })
}

export const useCreateDebriefing = (caseId: CaseId) =>
  useCaseFormMutation<
    // What the backend fills in itself is not sent.
    Omit<components["schemas"]["DebriefingCreate"], "id">,
    components["schemas"]["DebriefingCreate"]
  >(caseId, makeApiUrl("debriefings"))

export const useCreateSummon = (caseId: CaseId) =>
  useCaseFormMutation<
    // What the backend fills in itself is not sent.
    Omit<
      components["schemas"]["Summon"],
      "id" | "type_name" | "date_added" | "persons"
    > & {
      persons: Omit<components["schemas"]["SummonedPerson"], "id" | "summon">[]
    },
    components["schemas"]["Summon"]
  >(caseId, makeApiUrl("summons"))

export const useCreateDecision = (caseId: CaseId) =>
  useCaseFormMutation<
    // What the backend fills in itself is not sent.
    Omit<
      components["schemas"]["Decision"],
      "id" | "date_added" | "sanction_id"
    >,
    components["schemas"]["Decision"]
  >(caseId, makeApiUrl("decisions"))

export const useCreateQuickDecision = (caseId: CaseId) =>
  useCaseFormMutation<
    // What the backend fills in itself is not sent.
    Omit<components["schemas"]["QuickDecision"], "id" | "date_added">,
    components["schemas"]["QuickDecision"]
  >(caseId, makeApiUrl("quick-decisions"))

export const useCloseCase = (caseId: CaseId) =>
  useCaseFormMutation<
    // What the backend fills in itself is not sent.
    Omit<components["schemas"]["CaseClose"], "id" | "date_added">,
    components["schemas"]["CaseClose"]
  >(caseId, makeApiUrl("case-close"))

export const useCreateCitizenReport = (caseId: CaseId) =>
  useCaseFormMutation<
    // What the backend fills in itself is not sent.
    Omit<
      components["schemas"]["CitizenReport"],
      "id" | "date_added" | "advertisements"
    > & { advertisements?: { link: string }[] },
    components["schemas"]["CitizenReport"]
  >(caseId, makeApiUrl("cases", caseId, "citizen-reports"))

export const useCreateVisit = (caseId: CaseId) =>
  useCaseFormMutation<
    // What the backend fills in itself is not sent; the task the visit
    // completes is.
    Omit<components["schemas"]["Visit"], "id" | "authors"> & { task: string },
    components["schemas"]["Visit"]
  >(caseId, makeApiUrl("visits"))

export const useCreateSchedule = (caseId: CaseId) =>
  useCaseFormMutation<
    // What the backend fills in itself is not sent.
    Omit<components["schemas"]["ScheduleCreate"], "id" | "date_added">,
    components["schemas"]["ScheduleCreate"]
  >(caseId, makeApiUrl("schedules"))

// The backend starts a workflow in the background (a Celery task), so the new
// task is not there yet when the request returns.
const WORKFLOW_REFRESH_DELAYS = [0, 2000, 6000]

/**
 * Refetches the open tasks, the processes and the events of a case now and a
 * few times after, for an action whose result the backend makes in the background.
 */
export const useRefreshCaseWorkflowsSoon = (caseId: CaseId) => {
  const queryClient = useQueryClient()

  return () =>
    WORKFLOW_REFRESH_DELAYS.forEach((delay) =>
      setTimeout(() => {
        void queryClient.invalidateQueries({
          queryKey: queryKeys.cases.workflows(caseId),
        })
        void queryClient.invalidateQueries({
          queryKey: queryKeys.cases.workflowInstances(caseId),
        })
        void queryClient.invalidateQueries({
          queryKey: queryKeys.cases.events(caseId),
        })
      }, delay),
    )
}

/** Start an extra workflow process ("Taak opvoeren"). */
export const useStartWorkflowProcess = (caseId: CaseId) =>
  useCaseFormMutation<
    components["schemas"]["StartWorkflow"],
    components["schemas"]["StartWorkflow"]
  >(caseId, makeApiUrl("cases", caseId, "processes", "start"))
