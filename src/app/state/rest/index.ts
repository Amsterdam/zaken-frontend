import qs from "qs"
import slashSandwich from "slash-sandwich"

import useApiRequest from "./hooks/useApiRequest"
import { getHeaders, makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import { APIListResponse } from "./types/ApiListResponse"
import { BAGAddressResponse } from "./types/BAGAddressResponse"
import { BAGObjectResponse } from "./types/BAGObjectResponse"

export type ApiGroup =
  | "addresses"
  | "cases"
  | "caseTypes"
  | "caseStates"
  | "dataPunt"
  | "permits"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
}

/**
 * Please configure your endpoints here:
 * NOTE: For example "cases" and "cases/:id" share the same group config. Cache will be cleared for the whole group.
 */

export const useResidents = (bagId: Components.Schemas.Address["bag_id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Residents>({
    ...options,
    url: makeGatewayUrl("addresses", bagId, "residents"),
    groupName: "addresses",
    handleError,
    getHeaders
  })
}

export const useCases = (state_date?: string, options?: Options) => {
  const url = `${ makeGatewayUrl("cases") }${ state_date !== undefined ? `?state_date=${ state_date }` : "" }`
  const handleError = useErrorHandler()
  return useApiRequest<APIListResponse<Components.Schemas.Case>>({
    ...options,
    url,
    groupName: "cases",
    handleError,
    getHeaders
  })
}

export const useCase = (id: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Case>({
    ...options,
    url: makeGatewayUrl("cases", id),
    groupName: "cases",
    handleError,
    getHeaders
  })
}

export const useCaseFines = (id: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.FineList>({
    ...options,
    url: makeGatewayUrl("cases", id, "fines"),
    groupName: "cases",
    handleError,
    getHeaders
  })
}

export const useCaseResidents = (id: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Residents>({
    ...options,
    url: makeGatewayUrl("cases", id, "residents"),
    groupName: "cases",
    handleError,
    getHeaders
  })
}

export const useDebriefings = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<APIListResponse<Components.Schemas.Debriefing>>({
    ...options,
    url: makeGatewayUrl("debriefings"),
    groupName: "cases",
    handleError,
    getHeaders
  })
}

export const useCaseTimeline = (caseId: Components.Schemas.Case["id"]) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseTimeline[]>({
    url: makeGatewayUrl("cases", caseId, "timeline"),
    groupName: "cases",
    handleError,
    getHeaders
  })
}

export const useBAG = (bagId: string | undefined, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<BAGAddressResponse>({
    url: `https://api.data.amsterdam.nl/atlas/search/adres/?q=${ bagId }`,
    lazy: bagId === undefined,
    ...options,
    groupName: "dataPunt",
    handleError
  })
}

export const useBAGWithZipCode = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<BAGAddressResponse>({
    url: `https://api.data.amsterdam.nl/atlas/search/postcode/?q=${ bagId }`,
    ...options,
    groupName: "dataPunt",
    handleError
  })
}

export const useBAGLodging = (type: string | undefined, subTypeId: string | undefined, options?: Options) => {
  const handleError = useErrorHandler()
  const url = slashSandwich(["https://api.data.amsterdam.nl/bag/v1.1", type, subTypeId], { trailingSlash: true })

  return useApiRequest<BAGObjectResponse>({
    url: url,
    lazy: type === undefined || subTypeId === undefined,
    ...options,
    groupName: "dataPunt",
    handleError
  })
}

export const usePanorama = (lat?: number, lon?: number, width?: number, aspect?: number, radius?: number, fov?: number, options?: Options) => {
  const handleError = useErrorHandler()
  const queryString = qs.stringify({ lat, lon, width, fov, aspect, radius }, { addQueryPrefix: true })
  return useApiRequest<{ url: string }>({
    ...options,
    url: `https://api.data.amsterdam.nl/panorama/thumbnail/${ queryString }`,
    groupName: "dataPunt",
    handleError
  })
}

export const usePermitCheckmarks = (bagId: string) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ has_b_and_b_permit: boolean, has_vacation_rental_permit: boolean }>({
    url: makeGatewayUrl("addresses", bagId, "permits","checkmarks"),
    groupName: "permits",
    handleError,
    getHeaders
  })
}

export const usePermitDetails = (bagId: string) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.DecosPermit[]>({
    url: makeGatewayUrl("addresses", bagId, "permits"),
    groupName: "permits",
    handleError,
    getHeaders
  })
}
