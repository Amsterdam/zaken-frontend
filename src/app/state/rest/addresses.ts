import qs from "qs"
import slashSandwich from "slash-sandwich"

import type { Options } from "./"
import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useCasesByBagId = (bagId: Components.Schemas.Address["bag_id"], openCases?: boolean, options?: Options) => {
  const handleError = useErrorHandler()
  const queryString = openCases === true ? qs.stringify({ open_cases: true }, { addQueryPrefix: true }) : ""
  return useApiRequest<Components.Schemas.PaginatedCaseList>({
    ...options,
    url: `${ makeGatewayUrl("addresses", bagId, "cases") }${ queryString }`,
    groupName: "addresses",
    handleError,
    isProtected: true
  })
}

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

export const useBAG = (bagId?: Components.Schemas.Address["bag_id"], options?: Options) => {
  const handleError = useErrorHandler()
  const queryString = bagId !== undefined ? qs.stringify({ q: bagId }, { addQueryPrefix: true }) : ""
  return useApiRequest<BAGAddressResponse>({
    url: `https://api.data.amsterdam.nl/atlas/search/adres/${ queryString }`,
    lazy: bagId === undefined,
    ...options,
    groupName: "dataPunt",
    handleError
  })
}

export const useBAGWithZipCode = (bagId: Components.Schemas.Address["bag_id"], options?: Options) => {
  const handleError = useErrorHandler()
  const queryString = qs.stringify({ q: bagId }, { addQueryPrefix: true })
  return useApiRequest<BAGAddressResponse>({
    url: `https://api.data.amsterdam.nl/atlas/search/postcode/${ queryString }`,
    ...options,
    groupName: "dataPunt",
    handleError
  })
}

export const useBAGLodging = (type?: string, subTypeId?: string, options?: Options) => {
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
