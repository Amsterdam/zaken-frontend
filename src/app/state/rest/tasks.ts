import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
//import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useTasks = (id: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<MockComponents.Schemas.Task[]>({
    ...options,
    //url: makeApiUrl("tasks"),
    url: "tasks",
    groupName: "cases",
    handleError,
    isProtected: true,
    isMocked: true
  })
}