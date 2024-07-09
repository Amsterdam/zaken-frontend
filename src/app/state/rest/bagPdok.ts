import type { Options } from "."
import { useErrorHandler } from "./hooks/utils/errorHandler"
import useApiRequest from "./hooks/useApiRequest"
import qs from "qs"

const PDOK_URL = "https://api.pdok.nl/bzk/locatieserver/search/v3_1/free"
const MUNICIPALITY_FILTER = "fq=(gemeentenaam:(amsterdam)) "
const ADDRESS_FILTER = "AND (type:adres) AND (adrestype: hoofdadres)"
// const ADDRESS_SORT = "straatnaam asc, huisnummer asc, huisletter asc, huisnummertoevoeging asc"
const DEFAULT_SORT = "score desc, weergavenaam asc"
const FIELD_LIST = "weergavenaam,adrestype,gemeentenaam,nummeraanduiding_id,adresseerbaarobject_id,straatnaam,huisnummer,huisletter,huisnummertoevoeging,postcode,woonplaatsnaam,centroide_ll,score"
const START = 0
const RESULTS_PER_PAGE = 25

export const useBagPdok = (searchString?: string, options?: Options) => {
  const handleError = useErrorHandler()
  const query = qs.stringify({ 
    q: searchString,
    fq: `${ MUNICIPALITY_FILTER }${ ADDRESS_FILTER }`,
    fl: FIELD_LIST,
    start: START.toString(),
    rows: RESULTS_PER_PAGE.toString(),
    sort: DEFAULT_SORT
  }, { 
    addQueryPrefix: true 
  })
  return useApiRequest<BAGPdokResponse>({
    url: `${ PDOK_URL }${ query }`,
    lazy: searchString === undefined,
    ...options,
    groupName: "dataPunt",
    handleError
  })
}
