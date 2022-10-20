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

const sortingIndexMapping: any = {
  "owner": "owner",
  "case.address.street_name": "case__address__street_name",
  "case.address.postal_code": "case__address__postal_code",
  "due_date": "due_date",
  "name": "name"
}

const getOrderingValue = (sorting: TABLE.Schemas.Sorting) => {
  let value = ""
  if (sorting?.dataIndex) {
    value = sortingIndexMapping[sorting.dataIndex]
  }
  if (sorting.order === sortingOrder.DESCEND) {
    value = `-${ value }`
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
  reason?: string,
  districtNames?: Components.Schemas.District["name"][],
  housingCorporations?: string[]
) => {
  let urlParams: any = {
    completed: false,
    page: pagination.page,
    page_size: pagination.pageSize,
    is_enforcement_request: isEnforcementRequest
  }
  if (sensitive === false) {
    urlParams.sensitive = false
  }
  if (theme) {
    urlParams.theme_name = theme
  }
  if (reason) {
    urlParams.reason_name = reason
  }
  if (taskNames && taskNames?.length > 0) {
    urlParams.name = taskNames
  }
  if (role) {
    urlParams.role = role
  }
  if (owner) {
    urlParams.owner = owner
  }
  if (districtNames && districtNames?.length > 0) {
    urlParams.district_name = districtNames
  }
  if (housingCorporations && housingCorporations?.length > 0) {
    urlParams.housing_corporation = housingCorporations
  }
  if (sorting) {
    urlParams.ordering = getOrderingValue(sorting)
  }

  const queryString = isEmpty(urlParams) ? "" : qs.stringify(urlParams, { addQueryPrefix: true, indices: false  })

  return `${ makeApiUrl("tasks") }${ queryString }`
}

export const useTasks = (
  sensitive = false,
  pagination: TABLE.Schemas.Pagination,
  sorting?: TABLE.Schemas.Sorting,
  theme?: string,
  role?: string,
  owner?: string,
  isEnforcementRequest?: boolean,
  taskNames?: Components.Schemas.CaseUserTaskTaskName["name"][],
  reason?: string,
  districtNames?: Components.Schemas.District["name"][],
  housingCorporations?: string[],
  options?: Options
) => {
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
    reason,
    districtNames,
    housingCorporations
  )

  return useApiRequest<Components.Schemas.PaginatedCaseUserTaskList>({
    ...options,
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
  const apiUrl = `${ makeApiUrl("tasks", "task-names") }${ queryString }`
  return useApiRequest<Components.Schemas.CaseUserTaskTaskName[]>({
    url: apiUrl,
    groupName: "themes",
    handleError,
    isProtected: true
  })
}
