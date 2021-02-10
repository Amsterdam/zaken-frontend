import qs from "qs"

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
