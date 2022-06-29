import qs from "qs"
import type { Options } from "."
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useTasksReasons = (theme: string, options?: Options) => {
  const handleError = useErrorHandler()
  const queryString = qs.stringify({ theme }, { addQueryPrefix: true })
  const apiUrl = `${ makeApiUrl("tasks", "reason-names") }${ queryString }`
  return useApiRequest<Components.Schemas.CaseReason[]>({
    ...options,
    url: apiUrl,
    groupName: "themes",
    handleError,
    isProtected: true
  })
}
