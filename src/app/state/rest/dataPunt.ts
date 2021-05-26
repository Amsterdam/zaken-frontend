import qs from "qs"
import slashSandwich from "slash-sandwich"

import type { Options } from "./"
import { useErrorHandler, useSuppressErrorHandler } from "./hooks/utils/errorHandler"
import useApiRequest from "./hooks/useApiRequest"

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

export const useBAGWithZipCode = (bagId?: Components.Schemas.Address["bag_id"], options?: Options) => {
  const handleError = useErrorHandler()
  const queryString = qs.stringify({ q: bagId }, { addQueryPrefix: true })
  return useApiRequest<BAGAddressResponse>({
    url: `https://api.data.amsterdam.nl/atlas/search/postcode/${ queryString }`,
    lazy: bagId === undefined,
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
  const handleError = useSuppressErrorHandler()
  const queryString = qs.stringify({ lat, lon, width, fov, aspect, radius }, { addQueryPrefix: true })
  return useApiRequest<{ url: string }>({
    ...options,
    url: `https://api.data.amsterdam.nl/panorama/thumbnail/${ queryString }`,
    groupName: "dataPunt",
    handleError
  })
}
