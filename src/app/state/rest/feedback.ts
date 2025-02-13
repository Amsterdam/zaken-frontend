import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"


export const useFeedback = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Feedback>({
    lazy: true,
    ...options,
    url: makeApiUrl("feedback"),
    groupName: "supportContacts",
    handleError,
    isProtected: true
  })
}
