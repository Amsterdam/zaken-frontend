import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import useApiRequest from "./hooks/useApiRequest"
// import { makeApiUrl } from "./hooks/utils/apiUrl"

// TODO-MOCKED replace with real endpoint
export const usePermissions = (options?: Options) => {
    const handleError = useErrorHandler()
    return useApiRequest<MockComponents.Schemas.Permissions>({
      ...options,
      // url: makeApiUrl("users/me"),
      url: "permissions",
      groupName: "permissions",
      handleError,
      isMocked: true
    })
  }
