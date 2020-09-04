import useApiRequest from "./hooks/useApiRequest"
import { getHeaders, makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import { APIListResponse } from "./types/ApiListResponse"
import { BAGAddressResponse } from "./types/BAGAddressResponse"

export type ApiGroup =
  | "cases"
  | "caseTypes"
  | "caseStates"
  | "dataPunt"

/**
 * Please configure your endpoints here:
 * NOTE: For example "cases" and "cases/:id" share the same group config. Cache will be cleared for the whole group.
 */

export const useCases = () => {
  const handleError = useErrorHandler()
  return useApiRequest<APIListResponse<Components.Schemas.Case>>({
    url: makeGatewayUrl("cases"),
    groupName: "cases",
    handleError,
    getHeaders
  })
}

export const useCase = (id: NonNullable<Components.Schemas.Case["identification"]>) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Case>({
    url: makeGatewayUrl("cases", id),
    groupName: "cases",
    handleError,
    getHeaders
  })
}

export const useCaseFines = (id: NonNullable<Components.Schemas.Case["identification"]>) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.FineList>({
    url: makeGatewayUrl("cases", id, "fines"),
    groupName: "cases",
    handleError,
    getHeaders
  })
}

export const useCaseResidents = (id: NonNullable<Components.Schemas.Case["identification"]>) => {
  const handleError = useErrorHandler()
  return useApiRequest<{ items: Components.Schemas.Resident[] }>({
    url: makeGatewayUrl("cases", id, "residents"),
    groupName: "cases",
    handleError,
    getHeaders
  })
}


export const useCaseTypes = () => {
  const handleError = useErrorHandler()
  return useApiRequest<APIListResponse<Components.Schemas.CaseType>>({
    url: makeGatewayUrl("case-types"),
    groupName: "caseTypes",
    handleError,
    getHeaders
  })
}

export const useBAG = (bagId: string) => {
  const handleError = useErrorHandler()
  return useApiRequest<BAGAddressResponse>({
    url: `https://api.data.amsterdam.nl/atlas/search/adres/?q=${ bagId }`,
    groupName: "dataPunt",
    handleError
  })
}
