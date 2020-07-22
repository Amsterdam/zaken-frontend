import { useCallback } from "react"
import { navigate } from "@reach/router"

import to from "app/features/shared/routing/to"
import { useCase,  useCaseTypes } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

export const useEditPage = (id?: API.Case["id"]) => {
  const { isBusy: isGettingCaseTypes } = useCaseTypes()
  const { data: initialValues, execPut, execDelete } = useCase(id!)
  const { addSuccessFlashMessage } = useFlashMessages()

  const handleUpdate = useCallback(payload =>
      execPut(payload, () => {
        addSuccessFlashMessage("/cases", "Succesvol gewijzigd", "De zaak is succesvol gewijzigd")
        return navigate(to("/cases"))
      }),
    [addSuccessFlashMessage, execPut]
  )

  const handleDelete = useCallback(() =>
      execDelete(() => {
        addSuccessFlashMessage("/cases", "Succesvol verwiderd", "De zaak is succesvol verwijderd")
        return navigate(to("/cases"))
      }),
    [addSuccessFlashMessage, execDelete]
  )

  const isLoading = !initialValues || isGettingCaseTypes

  return {
    isLoading,
    initialValues,
    handleUpdate,
    handleDelete
  }
}
