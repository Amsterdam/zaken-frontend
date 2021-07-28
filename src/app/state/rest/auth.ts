import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useIsAuthorized = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<IsAuthorizedResponse>({
    ...options,
    url: makeApiUrl("is-authorized"),
    groupName: "auth",
    handleError,
    isProtected: true
  })
}

export const usePermissions = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<string[]>({
    ...options,
    url: makeApiUrl("permissions"),
    groupName: "auth",
    handleError,
    isProtected: true
  })
}