
import type { Options } from "./"
import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useFine = (id: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.FineList>({
    ...options,
    url: makeGatewayUrl("fines", id),
    groupName: "case",
    handleError,
    isProtected: true
  })
}