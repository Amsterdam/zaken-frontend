import produce from "immer"
import { useGlobalState } from "app/state/state/globalState"

import to from "app/features/shared/routing/to"
import { useCrudUpdate, useCrudDelete } from "app/features/shared/hooks/useCrud/useCrud"

export const useEditPage = (uuid?: API.Case["uuid"]) => {
  const {
    cases: { isGetting: isGettingCases, data  },
    caseTypes: { isGetting: isGettingCaseTypes },
    caseStatuses: { isGetting: isGettingCaseStatuses }
  } = useGlobalState()

  // Find caseDetails
  const caseDetails = produce(
    data?.find(caseDetails => caseDetails.uuid === uuid),
    (draft) => {
      if (draft !== undefined) {
        // TODO find a better solution for this.
        draft.status = draft?.status?.url
      }
    }
  )


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

  const handleDelete = useCrudDelete(caseDetails!, {
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

  const isLoading = !caseDetails || isGettingCaseTypes || isGettingCases || isGettingCaseStatuses

  return {
    isLoading,
    handleUpdate,
    handleDelete,
    caseDetails
  }
}
