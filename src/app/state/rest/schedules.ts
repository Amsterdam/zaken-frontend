import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useSchedules = (id?: Components.Schemas.Schedule["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit>({
    ...options,
    lazy: id === undefined,
    url: makeApiUrl("schedules"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}