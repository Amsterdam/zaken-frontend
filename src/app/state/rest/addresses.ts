
import type { Options } from "./"
import { useErrorHandler, useSuppressErrorHandler } from "./hooks/utils/utils"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const usePermitCheckmarks = (bagId: string) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ has_b_and_b_permit: boolean, has_vacation_rental_permit: boolean }>({
    url: makeApiUrl("addresses", bagId, "permits", "checkmarks"),
    groupName: "addresses",
    handleError,
    isProtected: true
  })
}

export const usePermitDetails = (bagId: string) => {
  const handleError = useSuppressErrorHandler()
  return useApiRequest<Components.Schemas.DecosPermit[]>({
    url: makeApiUrl("addresses", bagId, "permits"),
    groupName: "addresses",
    handleError,
    isProtected: true
  })
}

export const useResidents = (bagId: Components.Schemas.Address["bag_id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Residents>({
    ...options,
    url: makeApiUrl("addresses", bagId, "residents"),
    groupName: "addresses",
    handleError,
    isProtected: true
  })
}
