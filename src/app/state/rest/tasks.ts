import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"
import qs from "qs"

export const useTasks = (role?: string, options?: Options) => {
  const handleError = useErrorHandler()
  const queryString = qs.stringify({ role }, { addQueryPrefix: true })
  return useApiRequest<Components.Schemas.CamundaTaskList[]>({
    ...options,
    lazy: role === undefined,
    url: `${ makeApiUrl("tasks") }${ queryString }`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}
