import type { Options } from "./"
import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useIsAuthorized = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<IsAuthorizedResponse>({
    ...options,
    url: makeGatewayUrl("is-authorized"),
    groupName: "auth",
    handleError,
    isProtected: true
  })
}