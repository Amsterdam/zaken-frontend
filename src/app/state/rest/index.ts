import qs from "qs"
import slashSandwich from "slash-sandwich"

import useApiRequest from "./hooks/useApiRequest"
import { getHeaders, makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import { APIListResponse } from "./types/ApiListResponse"
import { BAGAddressResponse } from "./types/BAGAddressResponse"
import { BAGObjectResponse } from "./types/BAGObjectResponse"

export type ApiGroup =
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

export const useCases = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<APIListResponse<Components.Schemas.Case>>({
    ...options,
    url: makeGatewayUrl("cases"),
    groupName: "cases",
    handleError,
    getHeaders
  })
}

export const useCase = (id: NonNullable<Components.Schemas.Case["identification"]>, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Case>({
    ...options,
    url: makeGatewayUrl("cases", id),
    groupName: "cases",
    handleError,
    getHeaders
  })
}

export const useCaseFines = (id: NonNullable<Components.Schemas.Case["identification"]>, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.FineList>({
    ...options,
    url: makeGatewayUrl("cases", id, "fines"),
    groupName: "cases",
    handleError,
    getHeaders
  })
}

export const useCaseResidents = (id: NonNullable<Components.Schemas.Case["identification"]>, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ items: Components.Schemas.Resident[] }>({
    ...options,
    url: makeGatewayUrl("cases", id, "residents"),
    groupName: "cases",
    handleError,
    getHeaders
  })
}


export const useCaseTypes = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<APIListResponse<Components.Schemas.CaseType>>({
    ...options,
    url: makeGatewayUrl("case-types"),
    groupName: "caseTypes",
    handleError,
    getHeaders
  })
}

export const useBAG = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<BAGAddressResponse>({
    url: `https://api.data.amsterdam.nl/atlas/search/adres/?q=${ bagId }`,
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

export const usePanorama = (lat?: number, lon?: number, width?: number, radius?: number, options?: Options) => {
  const handleError = useErrorHandler()
  const queryString = qs.stringify({ lat, lon, width, radius }, { addQueryPrefix: true })
  return useApiRequest<{ url: string }>({
    ...options,
    url: `https://api.data.amsterdam.nl/panorama/thumbnail/${ queryString }`,
    groupName: "dataPunt",
    handleError
  })
}

export const usePermitCheckmarks = (bagId: string) => {
  const handleError = useErrorHandler()
  const queryString = qs.stringify({ bagId }, { addQueryPrefix: true })
  return useApiRequest<{ has_b_and_b_permit: boolean, has_vacation_rental_permit: boolean }>({
    url: makeGatewayUrl("permits", "checkmarks", queryString),
    groupName: "permits",
    handleError,
    getHeaders
  })
}

export const usePermitDetails = (bagId: string) => {
  const handleError = useErrorHandler()
  const queryString = qs.stringify({ bagId }, { addQueryPrefix: true })
  return useApiRequest<Components.Schemas.DecosPermit[]>({
    url: makeGatewayUrl("permits", "details", queryString),
    groupName: "permits",
    handleError,
    getHeaders
  })
}
