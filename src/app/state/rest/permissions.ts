import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import useApiRequest from "./hooks/useApiRequest"
import { makeApiUrl } from "./hooks/utils/apiUrl"

export const usePermissions = (options?: Options) => {
    const handleError = useErrorHandler()
    return useApiRequest<string[]>({
      ...options,
      url: makeApiUrl("permissions"),
      groupName: "permissions",
      handleError,
      isProtected: true
    })
  }

