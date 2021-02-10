
import type { Options } from "./"
import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import useApiRequest from "./hooks/useApiRequest"


export const useResidents = (bagId: Components.Schemas.Address["bag_id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Residents>({
    ...options,
    url: makeGatewayUrl("addresses", bagId, "residents"),
    groupName: "addresses",
    handleError,
    isProtected: true
  })
}
