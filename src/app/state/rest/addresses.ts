
import type { Options } from "./"
import { useErrorHandler, useSuppressErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const usePermitDetails = (bagId: string) => {
  const handleError = useSuppressErrorHandler()
  return useApiRequest<Components.Schemas.Decos>({
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

export const useCorporations = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedHousingCorporationList>({
    ...options,
    url: makeApiUrl("addresses", "housing-corporations"),
    groupName: "addresses",
    handleError,
    isProtected: true
  })
}

export const useDistricts = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedDistrictList>({
    ...options,
    url: makeApiUrl("addresses", "districts"),
    groupName: "addresses",
    handleError,
    isProtected: true
  })
}
