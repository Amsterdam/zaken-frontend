import { useCallback, useEffect, useMemo } from "react"
import { useSearchParams } from "react-router"

export type CasesFilters = {
  addressSearch: string
  districtNames: components["schemas"]["District"]["name"][]
  fromStartDate: string
  housingCorporations: string[]
  housingCorporationIsNull: boolean
  openCases: string
  pagination: { page: number; pageSize: number }
  projects: string[]
  reason: string
  sorting: Required<TABLE.Schemas.Sorting>
  subjects: string[]
  tags: string[]
  theme: string
}

export const defaultCasesFilters: CasesFilters = {
  addressSearch: "",
  districtNames: [],
  fromStartDate: "",
  housingCorporations: [],
  housingCorporationIsNull: false,
  openCases: "open",
  pagination: { page: 1, pageSize: 25 },
  projects: [],
  reason: "",
  sorting: { dataIndex: "start_date", order: "DESCEND" },
  subjects: [],
  tags: [],
  theme: "",
}

const PAGE_SIZES = [10, 25, 100]

// The names and values in the URL are Dutch, like the paths.
// The filters that are a text, and the ones that are a list, with their name in the URL.
const textParams = {
  addressSearch: "zoekterm",
  fromStartDate: "vanaf",
  reason: "aanleiding",
  theme: "thema",
} as const
const listParams = {
  districtNames: "stadsdeel",
  housingCorporations: "corporatie",
  projects: "project",
  subjects: "onderwerp",
  tags: "tag",
} as const
const NO_CORPORATION_PARAM = "zonderCorporatie"
const OPEN_CASES_PARAM = "toon"
const PAGE_PARAM = "pagina"
const PAGE_SIZE_PARAM = "perPagina"
const SORT_PARAM = "sorteer"
const YES = "ja"

const openCasesValues: Record<string, string> = {
  open: "open",
  closed: "gesloten",
  all: "alle",
}
const sortValues: Record<string, string> = {
  start_date: "startdatum",
  last_updated: "gewijzigd",
  "address.street_name": "straat",
  "address.postal_code": "postcode",
  "reason.name": "aanleiding",
}

const keyOfValue = (values: Record<string, string>, value: string | null) =>
  Object.keys(values).find((key) => values[key] === value)

const keysOf = <T extends object>(object: T) =>
  Object.keys(object) as (keyof T)[]

/** The filters in the URL; what is missing or invalid has its default. */
export const parseCasesFilters = (params: URLSearchParams): CasesFilters => {
  const filters = structuredClone(defaultCasesFilters)

  keysOf(textParams).forEach((key) => {
    filters[key] = params.get(textParams[key]) ?? filters[key]
  })
  keysOf(listParams).forEach((key) => {
    filters[key] = params.getAll(listParams[key])
  })
  filters.housingCorporationIsNull = params.get(NO_CORPORATION_PARAM) === YES

  const openCases = keyOfValue(openCasesValues, params.get(OPEN_CASES_PARAM))
  if (openCases) filters.openCases = openCases

  const page = Number(params.get(PAGE_PARAM))
  if (Number.isInteger(page) && page > 0) filters.pagination.page = page
  const pageSize = Number(params.get(PAGE_SIZE_PARAM))
  if (PAGE_SIZES.includes(pageSize)) filters.pagination.pageSize = pageSize

  // Like the ordering of the API: a minus for descending.
  const sort = params.get(SORT_PARAM) ?? ""
  const isDescending = sort.startsWith("-")
  const dataIndex = keyOfValue(sortValues, sort.slice(isDescending ? 1 : 0))
  if (dataIndex) {
    filters.sorting = { dataIndex, order: isDescending ? "DESCEND" : "ASCEND" }
  }

  return filters
}

/** The URL of the filters; a filter at its default is left out. */
export const serializeCasesFilters = (filters: CasesFilters) => {
  const params = new URLSearchParams()

  keysOf(textParams).forEach((key) => {
    if (filters[key] !== defaultCasesFilters[key]) {
      params.set(textParams[key], filters[key])
    }
  })
  keysOf(listParams).forEach((key) => {
    filters[key].forEach((value) => params.append(listParams[key], value))
  })
  if (filters.housingCorporationIsNull) params.set(NO_CORPORATION_PARAM, YES)
  if (
    filters.openCases !== defaultCasesFilters.openCases &&
    openCasesValues[filters.openCases]
  ) {
    params.set(OPEN_CASES_PARAM, openCasesValues[filters.openCases])
  }

  const { page, pageSize } = filters.pagination
  if (page !== defaultCasesFilters.pagination.page) {
    params.set(PAGE_PARAM, String(page))
  }
  if (pageSize !== defaultCasesFilters.pagination.pageSize) {
    params.set(PAGE_SIZE_PARAM, String(pageSize))
  }

  const { dataIndex, order } = filters.sorting
  const defaultSorting = defaultCasesFilters.sorting
  const isDefaultSorting =
    dataIndex === defaultSorting.dataIndex && order === defaultSorting.order
  if (!isDefaultSorting && sortValues[dataIndex]) {
    params.set(
      SORT_PARAM,
      `${order === "DESCEND" ? "-" : ""}${sortValues[dataIndex]}`,
    )
  }

  return params
}

// The last filters of this tab, for a link to the overview without filters
// (the menu, a breadcrumb): you come back to what you were looking at.
const STORAGE_KEY = "zaken.casesFilters"

export const getLastCasesSearch = () => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) ?? ""
  } catch {
    return ""
  }
}

export const setLastCasesSearch = (search: string) => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, search)
  } catch {
    // Without storage the filters are only in the URL.
  }
}

type Update =
  Partial<CasesFilters> | ((filters: CasesFilters) => Partial<CasesFilters>)

/**
 * The search, filters, sorting and page of the cases overview. They live in
 * the URL, so a link shows the same list and "back" brings you back to it.
 */
export const useCasesFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useMemo(() => parseCasesFilters(searchParams), [searchParams])

  // Also for a URL you arrived on (a shared link).
  useEffect(() => setLastCasesSearch(searchParams.toString()), [searchParams])

  const update = useCallback(
    (change: Update) =>
      setSearchParams(
        (current) => {
          const currentFilters = parseCasesFilters(current)
          const next = serializeCasesFilters({
            ...currentFilters,
            ...(typeof change === "function" ? change(currentFilters) : change),
          })
          setLastCasesSearch(next.toString())
          return next
        },
        // A filter is no step in the history: "back" leaves the overview.
        { replace: true },
      ),
    [setSearchParams],
  )

  return { filters, update }
}
