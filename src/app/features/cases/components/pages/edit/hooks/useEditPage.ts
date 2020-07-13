import to from "app/features/shared/routing/to"
import { useCrud } from "app/features/shared/hooks/useCrud/useCrud"
import { useCase, useCases, useCaseStates, useCaseTypes } from "app/state/rest/config"

export const useEditPage = (uuid?: API.Case["uuid"]) => {
  const { isBusy: isGettingCases } = useCases()
  const { isBusy: isGettingCaseTypes } = useCaseTypes()
  const { isBusy: isGettingCaseStatuses } = useCaseStates()
  const { data: initialValues, execPut, execDelete } = useCase(uuid!)

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

  const isLoading = !initialValues || isGettingCaseTypes || isGettingCases || isGettingCaseStatuses

  return {
    isLoading,
    initialValues,
    handleUpdate,
    handleDelete
  }
}
