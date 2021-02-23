import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/utils"
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