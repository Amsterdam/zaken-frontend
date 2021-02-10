import type { Options } from "./"
import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useAuthors = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedUserList>({
    ...options,
    url: makeGatewayUrl("authors"),
    groupName: "authors",
    handleError,
    isProtected: true
  })
}