import qs from "qs"
import isEmpty from "lodash.isempty"
import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useCases = (
  page: number,
  page_size: number,
  theme: string,
  from_start_date?: string,
  ordering?: string,
  options?: Options
) => {
  const handleError = useErrorHandler()
  const urlParams: any = {}
  if (theme) {
    urlParams.theme = theme
  }
  if (from_start_date !== undefined) {
    urlParams.from_start_date = from_start_date
  }
  if (page !== undefined) {
    urlParams.page = page
  }
  if (page_size !== undefined) {
    urlParams.page_size = page_size
  }
  if (ordering !== undefined) {
    urlParams.ordering = ordering
  }
  const queryString = isEmpty(urlParams) ? "" : qs.stringify(urlParams, { addQueryPrefix: true })
  console.log("URL", `${ makeApiUrl("cases") }${ queryString }`)
  return useApiRequest<Components.Schemas.PaginatedCaseList>({
    ...options,
    url: `${ makeApiUrl("cases") }${ queryString }`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCasesByBagId = (bagId: Components.Schemas.Address["bag_id"], openCases?: boolean, options?: Options) => {
  const handleError = useErrorHandler()
  const queryString = openCases === true ? qs.stringify({ open_cases: true }, { addQueryPrefix: true }) : ""
  return useApiRequest<Components.Schemas.PaginatedCaseList>({
    ...options,
    url: `${ makeApiUrl("addresses", bagId, "cases") }${ queryString }`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}