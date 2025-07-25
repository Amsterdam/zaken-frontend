import qs from "qs"
import isEmpty from "lodash.isempty"
import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

const sortingOrder = {
  ASCEND: "ASCEND",
  DESCEND: "DESCEND"
}

// A second sorter parameter is added because of the huge number of duplicate values.
const sortingIndexMapping: Record<string, string> = {
  owner: "owner, due_date",
  "case.address.street_name": "case__address__street_name, due_date",
  "case.address.postal_code": "case__address__postal_code, due_date",
  due_date: "due_date, id",
  name: "name, due_date",
  "case.start_date": "case__start_date, due_date"
}

const getOrderingValue = (sorting: TABLE.Schemas.Sorting): string => {
  let value = ""
  if (sorting?.dataIndex) {
    value = sortingIndexMapping[sorting.dataIndex]
  }
  if (sorting.order === sortingOrder.DESCEND) {
    value = `-${value}`
  }
  return value
}

export const getQueryUrl = (
  sensitive = false,
  pagination: TABLE.Schemas.Pagination,
  sorting?: TABLE.Schemas.Sorting,
  theme?: string,
  role?: string,
  owner?: string,
  isEnforcementRequest?: boolean,
  taskNames?: Components.Schemas.CaseUserTaskTaskName["name"][],
  projects?: string[],
  reason?: string,
  subjects?: string[],
  tags?: string[],
  districtNames?: Components.Schemas.District["name"][],
  housingCorporations?: string[],
  housingCorporationIsNull?: boolean
): string => {
  const urlParams: Record<string, any> = {
    completed: false,
    page: pagination.page,
    page_size: pagination.pageSize,
    is_enforcement_request: isEnforcementRequest
  }

  if (sensitive === false) urlParams.sensitive = false
  if (theme) urlParams.theme_name = theme
  if (projects?.length) urlParams.project = projects
  if (reason) urlParams.reason_name = reason
  if (subjects?.length) urlParams.subject = subjects
  if (tags?.length) urlParams.tag = tags
  if (taskNames?.length) urlParams.name = taskNames
  if (role) urlParams.role = role
  if (owner) urlParams.owner = owner
  if (districtNames?.length) urlParams.district_name = districtNames
  if (housingCorporations) urlParams.housing_corporation = housingCorporations
  if (housingCorporationIsNull) urlParams.housing_corporation_isnull = true
  if (sorting) {
    urlParams.ordering = getOrderingValue(sorting)
  }

  const queryString = isEmpty(urlParams)
    ? ""
    : qs.stringify(urlParams, { addQueryPrefix: true, indices: false })

  return `${makeApiUrl("tasks")}${queryString}`
}

type UseTasksParams = {
  districtNames?: Components.Schemas.District["name"][]
  housingCorporationIsNull?: boolean
  housingCorporations?: string[]
  isEnforcementRequest?: boolean
  owner?: string
  pagination: TABLE.Schemas.Pagination
  projects?: string[]
  reason?: string
  role?: string
  sensitive?: boolean
  sorting?: TABLE.Schemas.Sorting
  subjects?: string[]
  tags?: string[]
  taskNames?: Components.Schemas.CaseUserTaskTaskName["name"][]
  theme?: string
}

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
  theme
}: UseTasksParams) => {
  const handleError = useErrorHandler()

  const queryUrl = getQueryUrl(
    sensitive,
    pagination,
    sorting,
    theme,
    role,
    owner,
    isEnforcementRequest,
    taskNames,
    projects,
    reason,
    subjects,
    tags,
    districtNames,
    housingCorporations,
    housingCorporationIsNull
  )

  return useApiRequest<Components.Schemas.PaginatedCaseUserTaskList>({
    url: queryUrl,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useTask = (id: number | string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseUserTask>({
    ...options,
    lazy: true,
    url: makeApiUrl("tasks", id),
    groupName: "task",
    handleError,
    isProtected: true
  })
}

export const useTaskUpdate = (id: number | string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseUserTask>({
    ...options,
    lazy: true,
    url: makeApiUrl("tasks", id),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useTaskNames = (role: string) => {
  const handleError = useErrorHandler()
  const queryParams = { completed: false, role }
  const queryString = qs.stringify(queryParams, { addQueryPrefix: true })
  const apiUrl = `${makeApiUrl("tasks", "task-names")}${queryString}`
  return useApiRequest<Components.Schemas.CaseUserTaskTaskName[]>({
    url: apiUrl,
    groupName: "themes",
    handleError,
    isProtected: true
  })
}

// useSummonTypesByTaskId for getting the available summonTypes for a specific task and thus Theme.
export const useSummonTypesByTaskId = (
  id: Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"],
  options?: Options
) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedSummonTypeList>({
    ...options,
    url: makeApiUrl("tasks", id, "summon-types"),
    groupName: "task",
    handleError,
    isProtected: true
  })
}
