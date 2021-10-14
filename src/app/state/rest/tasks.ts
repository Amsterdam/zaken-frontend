import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"
import qs from "qs"

export const useTasks = (role: string, options?: Options) => {
  const handleError = useErrorHandler()
  const queryString = role !== "" ? qs.stringify({ role }, { addQueryPrefix: true }) : ""
  return useApiRequest<Components.Schemas.CamundaTaskList[]>({
    ...options,
    url: `${ makeApiUrl("tasks") }${ queryString }`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useTask = (id: number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CamundaTaskList>({
    ...options,
    lazy: true,
    url: makeApiUrl("tasks", id),
    groupName: "task",
    handleError,
    isProtected: true
  })
}
