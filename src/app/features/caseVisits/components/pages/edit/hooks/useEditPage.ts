import { useCallback } from "react"

import { useCaseVisit, CaseVisit } from "../../../../hooks/useCaseVisits"

export const useEditPage = (id?: Components.Schemas.Case["id"]) => {
  const initialValues = useCaseVisit(id!)

  const handleUpdate = useCallback(async (data: CaseVisit) => {}, [])
  const isLoading = false

  return {
    isLoading,
    initialValues,
    handleUpdate
  }
}
