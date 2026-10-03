import { useCallback, useContext } from "react"
import { initialState } from "app/state/context/initialState"
import { ContextValues } from "app/state/context/ValueProvider"

type Item = string | string[] | boolean

export function useFilterHandler() {
  const { pagination, updateContextCases } = useContext(ContextValues)["cases"]

  const onChangeFilter = useCallback(
    (key: string, item: Item) => {
      const casesContextItem: Partial<Record<string, any>> = {
        [key]: item,
        pagination: {
          ...pagination,
          page: 1,
        },
      }

      // Reset dependent filters if theme is changing
      if (key === "theme") {
        casesContextItem.reason = ""
        casesContextItem.projects = []
        casesContextItem.subjects = []
        casesContextItem.tags = []
      }

      updateContextCases(casesContextItem)
    },
    [pagination, updateContextCases],
  )

  // "Zonder corporatie" and the corporations exclude each other: the API
  // combines them with "and", which never matches.
  const onChangeCorporations = useCallback(
    (housingCorporations: string[], housingCorporationIsNull: boolean) => {
      updateContextCases({
        housingCorporations,
        housingCorporationIsNull,
        pagination: { ...pagination, page: 1 },
      })
    },
    [pagination, updateContextCases],
  )

  const onChangeSorting = useCallback(
    (sorting: TABLE.Schemas.Sorting) => {
      updateContextCases({ sorting, pagination: { ...pagination, page: 1 } })
    },
    [pagination, updateContextCases],
  )

  const onChangePageSize = useCallback(
    (pageSize: string) => {
      updateContextCases({
        pagination: {
          ...pagination,
          pageSize: parseInt(pageSize),
          page: 1,
        },
      })
    },
    [pagination, updateContextCases],
  )

  // Back to the defaults, the search included; the sorting and the page size stay.
  const onResetFilters = useCallback(() => {
    const {
      addressSearch,
      districtNames,
      fromStartDate,
      housingCorporations,
      housingCorporationIsNull,
      openCases,
      projects,
      reason,
      subjects,
      tags,
      theme,
    } = initialState.cases
    const filters = {
      addressSearch,
      districtNames,
      fromStartDate,
      housingCorporations,
      housingCorporationIsNull,
      openCases,
      projects,
      reason,
      subjects,
      tags,
      theme,
    }
    updateContextCases({ ...filters, pagination: { ...pagination, page: 1 } })
  }, [pagination, updateContextCases])

  return {
    onChangeFilter,
    onChangeCorporations,
    onChangePageSize,
    onChangeSorting,
    onResetFilters,
  }
}
