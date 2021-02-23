import qs from "qs"

import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/utils"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useCases = (state_date?: string, options?: Options) => {
  const queryString = state_date !== undefined ? qs.stringify({ state_date }, { addQueryPrefix: true }) : ""
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

export const useMockCases = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest({
    ...options,
    url: makeApiUrl("cases", "generate-mock"),
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