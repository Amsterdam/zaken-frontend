import qs from "qs"
import type { Options } from "."
import { useErrorHandler } from "./hooks/utils/errorHandler"
import useApiRequest from "./hooks/useApiRequest"

const BENKAGG_URL = "https://api.data.amsterdam.nl/v1/benkagg/adresseerbareobjecten"

export const useBenkAgg = (bagId?: Components.Schemas.Address["bag_id"], options?: Options) => {
  const handleError = useErrorHandler()
  const queryString = qs.stringify({ adresseertVerblijfsobjectIdentificatie: bagId }, { addQueryPrefix: true })
  return useApiRequest<BAGBenkAggResponse>({
    url: `${ BENKAGG_URL }${ queryString }`,
    lazy: bagId === undefined,
    ...options,
    groupName: "dataPunt",
    handleError
  })
}
