import { useCallback, useContext } from "react"
import { ContextValues } from "app/state/context/ValueProvider"

type Item = string | string[]

export function useFilterHandler() {
  const { pagination, updateContextCases } = useContext(ContextValues)["cases"]

  const onChangeFilter = useCallback(
    (key: string, item: Item) => {
      const casesContextItem: Partial<Record<string, any>> = {
        [key]: item,
        pagination: {
          ...pagination,
          page: 1
        }
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
    [pagination, updateContextCases]
  )

  const onChangePageSize = useCallback(
    (pageSize: string) => {
      updateContextCases({
        pagination: {
          ...pagination,
          pageSize: parseInt(pageSize),
          page: 1
        }
      })
    },
    [pagination, updateContextCases]
  )

  const onChangeTable = useCallback(
    (pagination: TABLE.Schemas.Pagination, sorting: TABLE.Schemas.Sorting) => {
      updateContextCases({ pagination, sorting })
    },
    [updateContextCases]
  )

  return {
    onChangeFilter,
    onChangePageSize,
    onChangeTable
  }
}
