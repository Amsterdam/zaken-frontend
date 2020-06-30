import { useCallback } from "react"
import { useGlobalActions, useGlobalState } from "app/state/state/globalState"

export const useEditPage = (uuid?: API.Case["uuid"]) => {
  // Get the info we need from the state:
  const {
    cases: { errorMessage, hasError, isGetting: isGettingCases, data  },
    caseTypes: { isGetting: isGettingCaseTypes }
  } = useGlobalState()
  // Get actions
  const {
    cases: { update: handleUpdate, del }
  } = useGlobalActions()

  // Find caseDetails
  const caseDetails = data?.find(caseDetails => caseDetails.uuid === uuid)
  // Define handleDelete callback
  const handleDelete = useCallback(() => del(caseDetails!), [ caseDetails, del ])
  // Are we still loading?
  const isLoading = isGettingCaseTypes || isGettingCases

  return {
    errorMessage,
    hasError,
    isLoading,
    handleUpdate,
    handleDelete,
    caseDetails
  }
}
