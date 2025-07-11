import qs from "qs"
import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"
import { cleanParamObject } from "./hooks/utils/cleanParamObject"
import { useMemo } from "react"

const sortingOrder = {
  ASCEND: "ASCEND",
  DESCEND: "DESCEND"
}

// A second sorter parameter is added because of the huge number of duplicate values.
const sortingIndexMapping: any = {
  "address.street_name": "address__street_name, start_date",
  "address.postal_code": "address__postal_code, start_date",
  "reason.name": "reason__name, start_date",
  start_date: "start_date, id",
  last_updated: "last_updated, start_date"
}

const getOpenCasesValue = (openCases?: string): boolean | undefined => {
  if (openCases === "open") return true
  if (openCases === "closed") return false
  return undefined
}

const getOrderingValue = (sorting: TABLE.Schemas.Sorting) => {
  let value = ""
  if (sorting?.dataIndex) {
    value = sortingIndexMapping[sorting.dataIndex]
  }
  if (sorting.order === sortingOrder.DESCEND) {
    value = `-${value}`
  }
  return value
}

export const useCases = (
  sensitive = false,
  pagination: TABLE.Schemas.Pagination,
  sorting?: TABLE.Schemas.Sorting,
  theme?: string,
  from_start_date?: string,
  openCases?: string,
  projects?: string[],
  reason?: string,
  streetName?: string,
  subjects?: string[],
  tags?: string[],
  districtNames?: Components.Schemas.District["name"][],
  housingCorporations?: string[],
  options?: Options
) => {
  const handleError = useErrorHandler()

  const urlParams = useMemo(() => {
    const hasValues = (arr?: any[]) => Array.isArray(arr) && arr.length > 0

    const params: Record<string, any> = {
      page: pagination.page,
      page_size: pagination.pageSize,
      from_start_date,
      open_cases: getOpenCasesValue(openCases),
      simplified: true,
      sensitive: sensitive === false ? false : undefined,
      theme_name: theme,
      project: hasValues(projects) ? projects : undefined,
      reason_name: reason,
      street_name: streetName,
      subject: hasValues(subjects) ? subjects : undefined,
      tag: hasValues(tags) ? tags : undefined,
      district_name: hasValues(districtNames) ? districtNames : undefined,
      housing_corporation: housingCorporations?.includes(
        "housing_corporation_isnull"
      )
        ? undefined
        : hasValues(housingCorporations)
          ? housingCorporations
          : undefined,
      housing_corporation_isnull: housingCorporations?.includes(
        "housing_corporation_isnull"
      )
        ? true
        : undefined,
      ordering: sorting ? getOrderingValue(sorting) : undefined
    }
    /*
     ** indices: false is used to prevent parsing arrays by qs to code like this: %5B0%5D,
     ** which cannot be parsed by the Django Python back-end or
     ** maybe config must be changed somewhere.
     */
    return qs.stringify(cleanParamObject(params), {
      addQueryPrefix: true,
      indices: false
    })
  }, [
    pagination.page,
    pagination.pageSize,
    from_start_date,
    sensitive,
    theme,
    openCases,
    projects,
    reason,
    streetName,
    subjects,
    tags,
    districtNames,
    housingCorporations,
    sorting
  ])

  return useApiRequest<Components.Schemas.PaginatedCaseList>({
    ...options,
    url: `${makeApiUrl("cases")}${ urlParams }`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCasesByBagId = (
  bagId: Components.Schemas.Address["bag_id"],
  openCases?: boolean,
  options?: Options
) => {
  const handleError = useErrorHandler()
  const queryString =
    openCases === true
      ? qs.stringify({ open_cases: true }, { addQueryPrefix: true })
      : ""
  return useApiRequest<Components.Schemas.PaginatedCaseList>({
    ...options,
    url: `${makeApiUrl("addresses", bagId, "cases")}${queryString}`,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}
