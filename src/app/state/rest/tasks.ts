import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useTasks = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedCamundaTaskList>({
    ...options,
    url: makeApiUrl("tasks"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}