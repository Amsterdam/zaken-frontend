import { useCallback, useEffect, useMemo } from "react"
import { useSearchParams } from "react-router"

export type TasksFilters = {
  districtNames: components["schemas"]["District"]["name"][]
  housingCorporations: string[]
  housingCorporationIsNull: boolean
  owners: string[]
  pagination: { page: number; pageSize: number }
  projects: string[]
  reason: string
  /** Not chosen (undefined) means your own role; "" means all roles. */
  role?: string
  sorting: Required<TABLE.Schemas.Sorting>
  subjects: string[]
  tags: string[]
  taskNames: components["schemas"]["CaseUserTaskTaskName"]["name"][]
  theme: string
}

export const defaultTasksFilters: TasksFilters = {
  districtNames: [],
  housingCorporations: [],
  housingCorporationIsNull: false,
  owners: [],
  pagination: { page: 1, pageSize: 25 },
  projects: [],
  reason: "",
  role: undefined,
  sorting: { dataIndex: "due_date", order: "ASCEND" },
  subjects: [],
  tags: [],
  taskNames: [],
  theme: "",
}

const PAGE_SIZES = [10, 25, 100]

// The names and values in the URL are Dutch, like the paths (the same names
// as the cases overview, see useCasesFilters).
const textParams = {
  reason: "aanleiding",
  theme: "thema",
} as const
const listParams = {
  districtNames: "stadsdeel",
  housingCorporations: "corporatie",
  owners: "toegewezen",
  projects: "project",
  subjects: "onderwerp",
  tags: "tag",
  taskNames: "taak",
} as const
const NO_CORPORATION_PARAM = "zonderCorporatie"
const ROLE_PARAM = "rol"
const ALL_ROLES = "alle"
const PAGE_PARAM = "pagina"
const PAGE_SIZE_PARAM = "perPagina"
const SORT_PARAM = "sorteer"
const YES = "ja"

const sortValues: Record<string, string> = {
  due_date: "slotdatum",
  "case.start_date": "startdatum",
  "case.address.street_name": "straat",
  "case.address.postal_code": "postcode",
  name: "taak",
}

const keysOf = <T extends object>(object: T) =>
  Object.keys(object) as (keyof T)[]

const keyOfValue = (values: Record<string, string>, value: string) =>
  Object.keys(values).find((key) => values[key] === value)

/** The filters in the URL; what is missing or invalid has its default. */
export const parseTasksFilters = (params: URLSearchParams): TasksFilters => {
  const filters = structuredClone(defaultTasksFilters)

  keysOf(textParams).forEach((key) => {
    filters[key] = params.get(textParams[key]) ?? filters[key]
  })
  keysOf(listParams).forEach((key) => {
    filters[key] = params.getAll(listParams[key])
  })
  filters.housingCorporationIsNull = params.get(NO_CORPORATION_PARAM) === YES

  const role = params.get(ROLE_PARAM)
  if (role !== null) filters.role = role === ALL_ROLES ? "" : role

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
export const serializeTasksFilters = (filters: TasksFilters) => {
  const params = new URLSearchParams()

  keysOf(textParams).forEach((key) => {
    if (filters[key] !== defaultTasksFilters[key]) {
      params.set(textParams[key], filters[key])
    }
  })
  keysOf(listParams).forEach((key) => {
    filters[key].forEach((value) => params.append(listParams[key], value))
  })
  if (filters.housingCorporationIsNull) params.set(NO_CORPORATION_PARAM, YES)
  if (filters.role !== undefined) {
    params.set(ROLE_PARAM, filters.role === "" ? ALL_ROLES : filters.role)
  }

  const { page, pageSize } = filters.pagination
  if (page !== defaultTasksFilters.pagination.page) {
    params.set(PAGE_PARAM, String(page))
  }
  if (pageSize !== defaultTasksFilters.pagination.pageSize) {
    params.set(PAGE_SIZE_PARAM, String(pageSize))
  }

  const { dataIndex, order } = filters.sorting
  const defaultSorting = defaultTasksFilters.sorting
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
const STORAGE_KEY = "zaken.tasksFilters"

export const getLastTasksSearch = () => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) ?? ""
  } catch {
    return ""
  }
}

export const setLastTasksSearch = (search: string) => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, search)
  } catch {
    // Without storage the filters are only in the URL.
  }
}

type Update =
  Partial<TasksFilters> | ((filters: TasksFilters) => Partial<TasksFilters>)

/**
 * The filters, sorting and page of the tasks overview. They live in the URL,
 * so a link shows the same list and "back" brings you back to it.
 */
export const useTasksFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useMemo(() => parseTasksFilters(searchParams), [searchParams])

  // Also for a URL you arrived on (a shared link).
  useEffect(() => setLastTasksSearch(searchParams.toString()), [searchParams])

  const update = useCallback(
    (change: Update) =>
      setSearchParams(
        (current) => {
          const currentFilters = parseTasksFilters(current)
          const next = serializeTasksFilters({
            ...currentFilters,
            ...(typeof change === "function" ? change(currentFilters) : change),
          })
          setLastTasksSearch(next.toString())
          return next
        },
        // A filter is no step in the history: "back" leaves the overview.
        { replace: true },
      ),
    [setSearchParams],
  )

  return { filters, update }
}
