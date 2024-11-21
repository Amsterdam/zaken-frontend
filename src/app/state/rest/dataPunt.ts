import qs from "qs"
import type { Options } from "./"
import { useSuppressErrorHandler } from "./hooks/utils/errorHandler"
import useApiRequest from "./hooks/useApiRequest"

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
