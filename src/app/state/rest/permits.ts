
import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import useApiRequest from "./hooks/useApiRequest"

export const usePermitCheckmarks = (bagId: string) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ has_b_and_b_permit: boolean, has_vacation_rental_permit: boolean }>({
    url: makeGatewayUrl("addresses", bagId, "permits", "checkmarks"),
    groupName: "permits",
    handleError,
    isProtected: true
  })
}

export const usePermitDetails = (bagId: string) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.DecosPermit[]>({
    url: makeGatewayUrl("addresses", bagId, "permits"),
    groupName: "permits",
    handleError,
    isProtected: true
  })
}
