
import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/utils"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useFine = (id: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.FineList>({
    ...options,
    url: makeApiUrl("fines", id),
    groupName: "fines",
    handleError,
    isProtected: true
  })
}