import qs from "qs"
import isEmpty from "lodash.isempty"
import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useTasks = (sensitive = false, theme: string, role: string, options?: Options) => {
  const handleError = useErrorHandler()
  const urlParams: any = {}
  if (sensitive === false) {
    urlParams.sensitive = false
  }
  if (theme) {
    urlParams.theme = theme
  }
  if (role) {
    urlParams.role = role
  }
  const queryString = isEmpty(urlParams) ? "" : qs.stringify(urlParams, { addQueryPrefix: true })
  return useApiRequest<Components.Schemas.CaseUserTaskList[]>({
    ...options,
    url: `${ makeApiUrl("tasks") }${ queryString }`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useTask = (id: number | string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseUserTaskList>({
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
  return useApiRequest<Components.Schemas.CaseUserTaskList>({
    ...options,
    lazy: true,
    url: makeApiUrl("tasks", id),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}
