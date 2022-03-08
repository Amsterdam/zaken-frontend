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

const dataIndexMapping: any = {
  "owner": "owner",
  "case.address.full_address": "case__address__street_name",
  "due_date": "due_date",
  "name": "name"
}

const getOrderingValue = (sorting: TABLE.Schemas.Sorting) => {
  let value = ""
  if (sorting?.dataIndex) {
    value = dataIndexMapping[sorting.dataIndex]
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
  owner?: string
) => {
  const urlParams: any = {
    page: pagination.page,
    page_size: pagination.pageSize,
    theme,
    role,
    owner
  }
  if (sensitive === false) {
    urlParams.sensitive = false
  }
  if (sorting) {
    urlParams.ordering = getOrderingValue(sorting)
  }

  const queryString = isEmpty(urlParams) ? "" : qs.stringify(urlParams, { addQueryPrefix: true })

  return `${ makeApiUrl("tasks") }${ queryString }`
}

export const useTasks = (
  sensitive = false,
  pagination: TABLE.Schemas.Pagination,
  sorting?: TABLE.Schemas.Sorting,
  theme?: string,
  role?: string,
  owner?: string,
  options?: Options
) => {
  const handleError = useErrorHandler()
  const queryUrl = getQueryUrl(sensitive, pagination, sorting, theme, role, owner)

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
