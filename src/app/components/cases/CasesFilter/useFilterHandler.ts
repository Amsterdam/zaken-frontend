import { useCallback } from "react"
import {
  type CasesFilters,
  defaultCasesFilters,
  useCasesFilters,
} from "../useCasesFilters"

type Item = string | string[] | boolean

const firstPage = ({ pagination }: CasesFilters) => ({
  pagination: { ...pagination, page: 1 },
})

/** The changes to the filters of the cases overview. Each one goes back to page 1. */
export function useFilterHandler() {
  const { update } = useCasesFilters()

  const onChangeFilter = useCallback(
    (key: string, item: Item) =>
      update((filters) => ({
        [key]: item,
        ...firstPage(filters),
        // The filters that depend on the theme.
        ...(key === "theme" && {
          reason: "",
          projects: [],
          subjects: [],
          tags: [],
        }),
      })),
    [update],
  )

  // "Zonder corporatie" and the corporations exclude each other: the API
  // combines them with "and", which never matches.
  const onChangeCorporations = useCallback(
    (housingCorporations: string[], housingCorporationIsNull: boolean) =>
      update((filters) => ({
        housingCorporations,
        housingCorporationIsNull,
        ...firstPage(filters),
      })),
    [update],
  )

  const onChangeSorting = useCallback(
    (sorting: CasesFilters["sorting"]) =>
      update((filters) => ({ sorting, ...firstPage(filters) })),
    [update],
  )

  const onChangePageSize = useCallback(
    (pageSize: string) =>
      update({ pagination: { page: 1, pageSize: parseInt(pageSize) } }),
    [update],
  )

  const onChangePage = useCallback(
    (page: number) =>
      update(({ pagination }) => ({ pagination: { ...pagination, page } })),
    [update],
  )

  // Back to the defaults, the search included; the sorting and the page size stay.
  const onResetFilters = useCallback(
    () =>
      update(({ sorting, pagination }) => ({
        ...defaultCasesFilters,
        sorting,
        pagination: { ...pagination, page: 1 },
      })),
    [update],
  )

  return {
    onChangeFilter,
    onChangeCorporations,
    onChangePage,
    onChangePageSize,
    onChangeSorting,
    onResetFilters,
  }
}
