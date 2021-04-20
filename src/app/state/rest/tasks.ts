import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useCamundaProcesses = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedCamundaProcessList>({
    ...options,
    url: makeApiUrl("camunda/process"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCamundaProcess = (id: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CamundaProcess>({
    ...options,
    lazy: true,
    url: makeApiUrl(`camunda/process/${ id }/start_sub_process`),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}