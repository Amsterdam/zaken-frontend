import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { stringifyQueryParams } from "@/api/utils/stringifyQueryParams"

// These are external APIs: never send the user's token (authenticated: false).

/**
 * Difference between the /free and /suggest endpoint is the speed and the search criteria:
 * /suggest is faster but you cannot search on bagId.
 */
const PDOK_URL = "https://api.pdok.nl/bzk/locatieserver/search/v3_1"
const MUNICIPALITY_FILTER = "gemeentenaam:(amsterdam)"
const ADDRESS_TYPE_HOOFDADRES_FILTER =
  "AND (type:adres) AND (adrestype: hoofdadres)"
const ADDRESS_TYPE_ADRES_FILTER = "AND (type:adres)"
const DEFAULT_SORT = "score desc, weergavenaam asc"
const FIELD_LIST =
  "weergavenaam,adrestype,gemeentenaam,nummeraanduiding_id,adresseerbaarobject_id,straatnaam,huisnummer,huisletter,huisnummertoevoeging,postcode,woonplaatsnaam,centroide_ll,score"
const START = 0
/** PDOK returns at most this many addresses. */
export const BAG_PDOK_MAX_RESULTS = 25

const BENKAGG_URL =
  "https://api.data.amsterdam.nl/v1/benkagg/adresseerbareobjecten"
const PANORAMA_URL = "https://api.data.amsterdam.nl/panorama/thumbnail/"

const constructPdokQuery = (
  onlyPrimaryAddress: boolean,
  searchString?: string,
) =>
  stringifyQueryParams({
    q: searchString,
    fq: `${MUNICIPALITY_FILTER}${onlyPrimaryAddress ? ADDRESS_TYPE_HOOFDADRES_FILTER : ADDRESS_TYPE_ADRES_FILTER}`,
    fl: FIELD_LIST,
    start: START,
    rows: BAG_PDOK_MAX_RESULTS,
    sort: DEFAULT_SORT,
  })

export const useBagPdok = (
  searchString?: string,
  options?: { enabled?: boolean },
) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.dataPunt.bagPdokSuggest(searchString),
    queryFn: () =>
      fetch<BAGPdokResponse>(
        `${PDOK_URL}/suggest${constructPdokQuery(true, searchString)}`,
        { authenticated: false },
      ),
    enabled: searchString !== undefined && (options?.enabled ?? true),
  })
}

/**
 * The /suggest endpoint does not return all addresses when searching by bagId, so this uses /free.
 * With onlyPrimaryAddress = false we get all addresses (including nevenadres) for the given bagId.
 */
export const useBagPdokByBagId = (searchString?: string) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.dataPunt.bagPdokFree(searchString),
    queryFn: () =>
      fetch<BAGPdokResponse>(
        `${PDOK_URL}/free${constructPdokQuery(false, searchString)}`,
        { authenticated: false },
      ),
    enabled: searchString !== undefined,
  })
}

export const useBenkAgg = (
  bagId?: components["schemas"]["Address"]["bag_id"],
) => {
  const fetch = useApiFetch()
  const queryString = stringifyQueryParams({
    adresseertVerblijfsobjectIdentificatie: bagId,
  })

  return useQuery({
    queryKey: queryKeys.dataPunt.benkAgg(bagId),
    queryFn: () =>
      fetch<BAGBenkAggResponse>(`${BENKAGG_URL}${queryString}`, {
        authenticated: false,
      }),
    enabled: bagId !== undefined,
  })
}

type PanoramaParams = {
  lat?: number
  lon?: number
  width?: number
  aspect?: number
  radius?: number
  fov?: number
}

export const usePanorama = (
  params: PanoramaParams,
  options?: { enabled?: boolean },
) => {
  const fetch = useApiFetch()
  const queryString = stringifyQueryParams(params)

  return useQuery({
    queryKey: queryKeys.dataPunt.panorama(params),
    queryFn: () =>
      fetch<{ url: string }>(`${PANORAMA_URL}${queryString}`, {
        authenticated: false,
      }),
    enabled: options?.enabled ?? true,
    meta: { globalErrorToast: false },
  })
}
