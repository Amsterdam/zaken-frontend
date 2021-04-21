import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useCamundaProcesses = (id: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedCamundaProcessList>({
    ...options,
    url: makeApiUrl(`cases/${ id }/processes`),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCamundaProcess = (id: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CamundaStartProcess>({
    ...options,
    lazy: true,
    url: makeApiUrl(`cases/${ id }/processes/start`),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}