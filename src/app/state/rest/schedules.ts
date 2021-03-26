import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useScheduleCreate = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.ScheduleCreate>({
    ...options,
    lazy: true,
    url: makeApiUrl("schedules"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}