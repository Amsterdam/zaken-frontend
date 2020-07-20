import to from "app/features/shared/routing/to"
import { useCrud } from "app/features/shared/hooks/useCrud/useCrud"
import { useCase,  useCaseTypes } from "app/state/rest/config"

export const useEditPage = (id?: API.Case["id"]) => {
  const { isBusy: isGettingCaseTypes } = useCaseTypes()
  const { data: initialValues, execPut, execDelete } = useCase(id!)

  const handleUpdate = useCrud({
    action: execPut,
    redirectTo: to("/cases"),
    success: {
      title: "Succesvol gewijzigd",
      body: "De zaak is succesvol gewijzigd"
    },
    error: {
      title: "Kon niet wijzigen"
    }
  })

  const handleDelete = useCrud({
    action: execDelete,
    redirectTo: to("/cases"),
    success: {
      title: "Succesvol verwijderd",
      body: "De zaak is succesvol verwijderd"
    },
    error: {
      title: "Kon niet verwijderen"
    }
  })

  const isLoading = !initialValues || isGettingCaseTypes

  return {
    isLoading,
    initialValues,
    handleUpdate,
    handleDelete
  }
}
