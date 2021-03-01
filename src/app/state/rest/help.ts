
import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useSupportContacts = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedSupportContactList>({
    ...options,
    url: makeApiUrl("support-contacts"),
    groupName: "supportContacts",
    handleError,
    isProtected: true
  })
}
