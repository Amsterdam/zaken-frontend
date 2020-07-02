import { useGlobalState } from "app/state/state/globalState"

import to from "app/features/shared/routing/to"
import { useCrudUpdate, useCrudDelete } from "app/features/shared/hooks/useCrud/useCrud"

export const useEditPage = (uuid?: API.Case["uuid"]) => {
  const {
    cases: { isGetting: isGettingCases, data  },
    caseTypes: { isGetting: isGettingCaseTypes },
    caseStatuses: { isGetting: isGettingCaseStatuses }
  } = useGlobalState()

  const initialValues = data?.find(caseDetails => caseDetails.uuid === uuid)

  const handleUpdate = useCrudUpdate({
    stateKey: "cases",
    redirectTo: to("/cases"),
    success: {
      title: "Succesvol gewijzigd",
      body: "De zaak is succesvol gewijzigd"
    },
    error: {
      title: "Kon niet wijzigen"
    }
  })

  const handleDelete = useCrudDelete(initialValues, {
    stateKey: "cases",
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
