import to from "app/features/shared/routing/to"
import { useCrud } from "app/features/shared/hooks/useCrud/useCrud"
import { useCaseVisit } from "../../../../hooks/useCaseVisits"

export const useEditPage = (id?: API.Case["id"]) => {
  const initialValues = useCaseVisit(id!)

  const handleUpdate = useCrud({
    action: async () => {},
    redirectTo: to("/case-visits/:caseId", { caseId: initialValues.case_id }),
    success: {
      title: "Succesvol gewijzigd",
      body: "Het zaakbezoek is succesvol gewijzigd"
    },
    error: {
      title: "Kon niet wijzigen"
    }
  })

  const isLoading = false

  return {
    isLoading,
    initialValues,
    handleUpdate
  }
}
