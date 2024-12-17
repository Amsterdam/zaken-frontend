
import qs from "qs"
import dayjs from "dayjs"
import type { Options } from "./"
import { useErrorHandler, useSuppressErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useAddresses = (bagId: Components.Schemas.Address["bag_id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Address>({
    ...options,
    url: makeApiUrl("addresses", bagId),
    groupName: "addresses",
    handleError,
    isProtected: true
  })
}

export const usePermitDetails = (bagId: string) => {
  const handleError = useSuppressErrorHandler()
  return useApiRequest<Components.Schemas.Decos>({
    url: makeApiUrl("addresses", bagId, "permits"),
    groupName: "addresses",
    handleError,
    isProtected: true
  })
}

export const usePermitsPowerBrowser = (bagId: string) => {
  const handleError = useSuppressErrorHandler()
  return useApiRequest<Components.Schemas.Powerbrowser[]>({
    url: makeApiUrl("addresses", bagId, "permits-powerbrowser"),
    groupName: "addresses",
    handleError,
    isProtected: true
  })
}

export const useMeldingen = (bagId: string) => {
  const queryString = qs.stringify({
    start_date: dayjs().subtract(1, "years").startOf("year").format()
  }, {
    addQueryPrefix: true
  })
  const handleError = useSuppressErrorHandler()
  return useApiRequest<Components.Schemas.Meldingen>({
    url: `${ makeApiUrl("addresses", bagId, "meldingen") }${ queryString }`,
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
    groupName: "housingCorporations",
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
