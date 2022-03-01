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

const dataIndexMapping: any = {
  "address.street_name": "address__street_name",
  "address.postal_code": "address__postal_code",
  "start_date": "start_date",
  "last_updated": "last_updated"
}

const getOrderingValue = (sorting: TABLE.Schemas.Sorting) => {
  let value = ""
  if (sorting?.dataIndex) {
    value = dataIndexMapping[sorting.dataIndex]
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
  fromStartDate?: string,
  options?: Options
) => {
  const handleError = useErrorHandler()
  const urlParams: any = {
    page: pagination.page,
    page_size: pagination.pageSize
  }
  if (sensitive === false) {
    urlParams.sensitive = false
  }
  if (theme !== undefined) {
    urlParams.theme = theme
  }
  if (fromStartDate !== undefined) {
    urlParams.from_start_date = fromStartDate
  }
  if (sorting) {
    urlParams.ordering = getOrderingValue(sorting)
  }

  const queryString = isEmpty(urlParams) ? "" : qs.stringify(urlParams, { addQueryPrefix: true })
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
