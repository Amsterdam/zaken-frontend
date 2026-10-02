import { useState } from "react"
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import {
  nonEmpty,
  stringifyQueryParams,
} from "@/api/utils/stringifyQueryParams"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"

type CaseId = components["schemas"]["CaseDetail"]["id"]

/**
 * Marks all case and task lists stale. They're not shown on the case page, so
 * nothing refetches now (only active queries do); they reload when shown again.
 */
export const invalidateCaseAndTaskLists = (queryClient: QueryClient) =>
  Promise.all(
    [
      queryKeys.cases.listAll,
      queryKeys.cases.byAddressAll,
      queryKeys.cases.tasksAll,
    ].map((queryKey) => queryClient.invalidateQueries({ queryKey })),
  )

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
 * - the case and task lists, which can be filtered on tag and subject, are
 *   marked stale: they reload the next time they are shown.
 */
export const useUpdateCase = (caseId: CaseId) => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      fetch<CaseItem>(makeApiUrl("cases", caseId), { method: "PATCH", data }),
    onSuccess: ({ tags, subjects }) => {
      queryClient.setQueryData<CaseItem>(
        queryKeys.cases.detail(caseId),
        (caseItem) => caseItem && { ...caseItem, tags, subjects },
      )
      queryClient.setQueryData<components["schemas"]["CaseEvent"][]>(
        queryKeys.cases.events(caseId),
        (events) =>
          events?.map((event) =>
            event.type === "CASE"
              ? {
                  ...event,
                  event_values: {
                    ...(event.event_values as Record<string, unknown>),
                    subjects: subjects.map(({ name }) => name),
                  },
                }
              : event,
          ),
      )
      void invalidateCaseAndTaskLists(queryClient)
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

const casesSortingIndexMapping: Record<string, string> = {
  // A second sorter parameter is added because of the huge number of duplicate values.
  "address.street_name": "address__street_name, start_date",
  "address.postal_code": "address__postal_code, start_date",
  "reason.name": "reason__name, start_date",
  start_date: "start_date, id",
  last_updated: "last_updated, start_date",
}

const getCasesOrdering = (sorting?: TABLE.Schemas.Sorting) => {
  if (!sorting) return undefined
  const value = sorting.dataIndex
    ? casesSortingIndexMapping[sorting.dataIndex]
    : ""
  return sorting.order === "DESCEND" ? `-${value}` : value
}

const getOpenCasesValue = (openCases?: string) => {
  if (openCases === "open") return true
  if (openCases === "closed") return false
  return undefined
}

export type CasesParams = {
  addressSearch?: string
  districtNames?: components["schemas"]["District"]["name"][]
  fromStartDate?: string
  housingCorporationIsNull?: boolean
  housingCorporations?: string[]
  openCases?: string
  pagination: TABLE.Schemas.Pagination
  projects?: string[]
  reason?: string
  sensitive?: boolean
  sorting?: TABLE.Schemas.Sorting
  subjects?: string[]
  tags?: string[]
  theme?: string
}

/**
 * The cases overview. Keeps showing the previous page/filter results while the
 * next ones load (isPlaceholderData). Empty strings and arrays are left out of
 * the query, like the old cleanParamObject did.
 */
export const useCases = ({
  addressSearch,
  districtNames,
  fromStartDate,
  housingCorporationIsNull,
  housingCorporations,
  openCases,
  pagination,
  projects,
  reason,
  sensitive = false,
  sorting,
  subjects,
  tags,
  theme,
}: CasesParams) => {
  const fetch = useApiFetch()
  const queryParams = {
    page: pagination.page,
    page_size: pagination.pageSize,
    from_start_date: fromStartDate || undefined,
    open_cases: getOpenCasesValue(openCases),
    simplified: true,
    sensitive: sensitive === false ? false : undefined,
    theme_name: theme || undefined,
    project: nonEmpty(projects),
    reason_name: reason || undefined,
    address_search: addressSearch || undefined,
    subject: nonEmpty(subjects),
    tag: nonEmpty(tags),
    district_name: nonEmpty(districtNames),
    housing_corporation: nonEmpty(housingCorporations),
    housing_corporation_isnull: housingCorporationIsNull ? true : undefined,
    ordering: getCasesOrdering(sorting),
  }

  return useQuery({
    queryKey: queryKeys.cases.list(queryParams),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedCaseList"]>(
        `${makeApiUrl("cases")}${stringifyQueryParams(queryParams)}`,
      ),
    placeholderData: keepPreviousData,
  })
}

/** The cases of an address; with openCases only the open ones. */
export const useCasesByBagId = (
  bagId: components["schemas"]["Address"]["bag_id"],
  openCases?: boolean,
) => {
  const fetch = useApiFetch()
  const queryString = stringifyQueryParams({
    open_cases: openCases === true ? true : undefined,
  })

  return useQuery({
    queryKey: queryKeys.cases.byAddress(bagId, openCases === true),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedCaseList"]>(
        `${makeApiUrl("addresses", bagId, "cases")}${queryString}`,
      ),
  })
}

export const useCaseEvents = (caseId: CaseId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.cases.events(caseId),
    queryFn: () =>
      fetch<components["schemas"]["CaseEvent"][]>(
        makeApiUrl("cases", caseId, "events"),
      ),
  })
}

export const useSummonsByCaseId = (caseId?: CaseId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.cases.summons(caseId),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedSummonList"]>(
        `${makeApiUrl("summons")}${stringifyQueryParams({ case: caseId })}`,
      ),
    enabled: caseId !== undefined,
  })
}

export const useCaseCloseReasons = (
  themeId?: components["schemas"]["CaseTheme"]["id"],
) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.cases.closeReasons(themeId),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedCaseCloseReasonList"]>(
        makeApiUrl("themes", themeId, "case-close-reasons"),
      ),
    enabled: themeId !== undefined,
  })
}

export const useCaseCloseResults = (
  themeId?: components["schemas"]["CaseTheme"]["id"],
) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.cases.closeResults(themeId),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedCaseCloseResultList"]>(
        makeApiUrl("themes", themeId, "case-close-results"),
      ),
    enabled: themeId !== undefined,
  })
}

/** The workflow processes that can be started on a case ("Taak opvoeren"). */
export const useWorkflowProcesses = (caseId: CaseId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.cases.processes(caseId),
    queryFn: () =>
      fetch<components["schemas"]["WorkflowOption"][]>(
        makeApiUrl("cases", caseId, "processes"),
      ),
  })
}

/**
 * Create a case. Afterwards the form navigates to the new case, so the case
 * lists (overview, cases of the address) are only marked stale.
 */
export const useCreateCase = () => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      fetch<components["schemas"]["CaseDetail"]>(makeApiUrl("cases"), {
        method: "POST",
        data,
      }),
    onSuccess: () =>
      Promise.all(
        [
          queryKeys.cases.listAll,
          queryKeys.cases.byAddressAll,
          queryKeys.cases.tasksAll,
        ].map((queryKey) =>
          queryClient.invalidateQueries({ queryKey, refetchType: "none" }),
        ),
      ),
  })
}
