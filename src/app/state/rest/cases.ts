import qs from "qs"

import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useCases = (start_date?: string, options?: Options) => {
  const queryString = start_date !== undefined ? qs.stringify({ date: start_date }, { addQueryPrefix: true }) : ""
  const url = `${ makeApiUrl("cases") }${ queryString }`
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedCaseList>({
    ...options,
    url,
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