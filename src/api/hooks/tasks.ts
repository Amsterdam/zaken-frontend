import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import {
  nonEmpty,
  stringifyQueryParams,
} from "@/api/utils/stringifyQueryParams"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"
import { invalidateCaseAndTaskLists } from "./cases"

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
 * workflows of its case right away, and the task lists the next time they're
 * shown (they're sorted on due date, so not updated in place). The old useTaskUpdate cleared the whole cases group,
 * which also refetched the case, its events and schedules for nothing.
 */
export const useUpdateTask = (
  taskId: Tasks.TaskId,
  caseId: components["schemas"]["CaseDetail"]["id"],
) => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()

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
      await Promise.all([
        // Not shown on the case page, so only marked stale (inactive queries don't refetch).
        queryClient.invalidateQueries({ queryKey: queryKeys.cases.tasksAll }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.cases.workflows(caseId),
        }),
      ])
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
 * - the case and task lists are marked stale (they're not shown here).
 */
export const useCompleteTask = (
  caseId: components["schemas"]["CaseDetail"]["id"],
) => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CompleteTaskPayload) =>
      fetch<string>(makeApiUrl("generic-tasks", "complete"), {
        method: "POST",
        data,
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.cases.events(caseId),
        }),
        invalidateCaseAndTaskLists(queryClient),
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

const sortingIndexMapping: Record<string, string> = {
  // A second sorter parameter is added because of the huge number of duplicate values.
  owner: "owner, due_date",
  "case.address.street_name": "case__address__street_name, due_date",
  "case.address.postal_code": "case__address__postal_code, due_date",
  due_date: "due_date, id",
  name: "name, due_date",
  "case.start_date": "case__start_date, due_date",
}

const getOrdering = (sorting?: TABLE.Schemas.Sorting) => {
  if (!sorting) return undefined
  const value = sorting.dataIndex ? sortingIndexMapping[sorting.dataIndex] : ""
  return sorting.order === "DESCEND" ? `-${value}` : value
}

export type TasksParams = {
  districtNames?: components["schemas"]["District"]["name"][]
  housingCorporationIsNull?: boolean
  housingCorporations?: string[]
  isEnforcementRequest?: boolean
  owner?: string[]
  pagination: TABLE.Schemas.Pagination
  projects?: string[]
  reason?: string
  role?: string
  sensitive?: boolean
  sorting?: TABLE.Schemas.Sorting
  subjects?: string[]
  tags?: string[]
  taskNames?: components["schemas"]["CaseUserTaskTaskName"]["name"][]
  theme?: string
}

/**
 * The open tasks of the overview. Keeps showing the previous page/filter
 * results while the next ones load (isPlaceholderData).
 */
export const useTasks = ({
  districtNames,
  housingCorporationIsNull = false,
  housingCorporations,
  isEnforcementRequest,
  owner,
  pagination,
  projects,
  reason,
  role,
  sensitive = false,
  sorting,
  subjects,
  tags,
  taskNames,
  theme,
}: TasksParams) => {
  const fetch = useApiFetch()
  const queryParams = {
    completed: false,
    page: pagination.page,
    page_size: pagination.pageSize,
    is_enforcement_request: isEnforcementRequest,
    sensitive: sensitive === false ? false : undefined,
    theme_name: theme || undefined,
    project: nonEmpty(projects),
    reason_name: reason || undefined,
    subject: nonEmpty(subjects),
    tag: nonEmpty(tags),
    name: nonEmpty(taskNames),
    role: role || undefined,
    owner: nonEmpty(owner),
    district_name: nonEmpty(districtNames),
    housing_corporation: housingCorporations,
    housing_corporation_isnull: housingCorporationIsNull ? true : undefined,
    ordering: getOrdering(sorting),
  }

  return useQuery({
    queryKey: queryKeys.cases.tasks(queryParams),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedCaseUserTaskList"]>(
        `${makeApiUrl("tasks")}${stringifyQueryParams(queryParams)}`,
      ),
    placeholderData: keepPreviousData,
  })
}

const isTask = (id: Tasks.TaskId | undefined, taskId: Tasks.TaskId) =>
  // The workflows return the id as a string (case_user_task_id), the task lists as a number.
  id !== undefined && String(id) === String(taskId)

/**
 * Assign a task to someone (or nobody, with null). Updates the owner in place
 * wherever the task is cached, without refetching: in the task lists of the
 * overview and in the workflows on the case page.
 */
export const useAssignTask = (taskId: Tasks.TaskId) => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (owner: string | null) =>
      fetch(makeApiUrl("tasks", taskId), { method: "PATCH", data: { owner } }),
    onSuccess: (_, owner) => {
      queryClient.setQueriesData<
        components["schemas"]["PaginatedCaseUserTaskList"]
      >({ queryKey: queryKeys.cases.tasksAll }, (data) =>
        data
          ? {
              ...data,
              results: data.results.map((task) =>
                isTask(task.id, taskId) ? { ...task, owner } : task,
              ),
            }
          : data,
      )
      queryClient.setQueriesData<Tasks.PaginatedWorkflowList>(
        {
          predicate: ({ queryKey }) =>
            queryKey[0] === "cases" && queryKey[2] === "workflows",
        },
        (data) =>
          data && {
            ...data,
            results: data.results.map((workflow) => ({
              ...workflow,
              tasks: workflow.tasks.map((task) =>
                isTask(task.case_user_task_id, taskId)
                  ? { ...task, owner }
                  : task,
              ),
            })),
          },
      )
    },
  })
}

/** The summon types that can be chosen for a task (its theme). */
export const useSummonTypesByTaskId = (taskId: Tasks.TaskId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.task.summonTypes(taskId),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedSummonTypeList"]>(
        makeApiUrl("tasks", taskId, "summon-types"),
      ),
  })
}
