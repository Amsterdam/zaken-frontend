
import type { Options } from "./"
import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useSupportContacts = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedSupportContactList>({
    ...options,
    url: makeGatewayUrl("support-contacts"),
    groupName: "supportContacts",
    handleError,
    isProtected: true
  })
}
