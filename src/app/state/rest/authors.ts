import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useAuthors = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedUserList>({
    ...options,
    url: makeApiUrl("authors"),
    groupName: "authors",
    handleError,
    isProtected: true
  })
}