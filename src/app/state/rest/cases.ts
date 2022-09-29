import qs from "qs"
import isEmpty from "lodash.isempty"
import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

const sortingOrder = {
  ASCEND: "ASCEND",
  DESCEND: "DESCEND"
}

const sortingIndexMapping: any = {
  "address.street_name": "address__street_name",
  "address.postal_code": "address__postal_code",
  "reason.name": "reason__name",
  "start_date": "start_date",
  "last_updated": "last_updated"
}

const getOrderingValue = (sorting: TABLE.Schemas.Sorting) => {
  let value = ""
  if (sorting?.dataIndex) {
    value = sortingIndexMapping[sorting.dataIndex]
  }
  if (sorting.order === sortingOrder.DESCEND) {
    value = `-${ value }`
  }
  return value
}

export const useCases = (
  sensitive = false,
  pagination: TABLE.Schemas.Pagination,
  sorting?: TABLE.Schemas.Sorting,
  theme?: string,
  from_start_date?: string,
  reason?: string,
  districtNames?: Components.Schemas.District["name"][],
  housingCorporations?: string[],
  options?: Options
) => {
  const handleError = useErrorHandler()
  const urlParams: any = {
    page: pagination.page,
    page_size: pagination.pageSize,
    from_start_date,
    open_cases: true
  }
  if (sensitive === false) {
    urlParams.sensitive = false
  }
  if (theme) {
    urlParams.theme_name = theme
  }
  if (reason) {
    urlParams.reason_name = reason
  }
  if (districtNames && districtNames?.length > 0) {
    urlParams.district_name = districtNames
  }
  if (housingCorporations && housingCorporations?.length > 0) {
    urlParams.housing_corporation = housingCorporations
  }
  if (sorting) {
    urlParams.ordering = getOrderingValue(sorting)
  }
  // urlParams.housing_corporation = ["5", "6"]

  /*
   ** indices: false is used to prevent parsing arrays by qs to code like this: %5B0%5D,
   ** which cannot be parsed by the Django Python back-end or
   ** maybe config must be changed somewhere.
   */
  const queryString = isEmpty(urlParams) ? "" : qs.stringify(urlParams, { addQueryPrefix: true, indices: false })

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
