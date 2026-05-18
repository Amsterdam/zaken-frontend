import type { Options } from "."
import { makeApiUrl } from "./hooks/utils/apiUrl"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import useApiRequest from "./hooks/useApiRequest"


export const useResidents = (bagId: Components.Schemas.Address["bag_id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Brp>({
    ...options,
    url: makeApiUrl("addresses", bagId, "residents"),
    groupName: "addresses",
    handleError,
    isProtected: true
  })
}
