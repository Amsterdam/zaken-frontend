import { useCallback } from "react"
import { navigate } from "@reach/router"

import to from "app/features/shared/routing/to"
import { useCase } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

export const useEditPage = (id?: Components.Schemas.Case["id"]) => {
  const { data: initialValues, execPut, execDelete } = useCase(id!)
  const { addSuccessFlashMessage } = useFlashMessages()

  const handleUpdate = useCallback(payload =>
      execPut(payload).then(() => {
        addSuccessFlashMessage("/cases", "Succesvol gewijzigd", "De zaak is succesvol gewijzigd")
        return navigate(to("/cases"))
      }),
    [addSuccessFlashMessage, execPut]
  )

  const handleDelete = useCallback(() =>
      execDelete().then(() => {
        addSuccessFlashMessage("/cases", "Succesvol verwijderd", "De zaak is succesvol verwijderd")
        return navigate(to("/cases"))
      }),
    [addSuccessFlashMessage, execDelete]
  )

  const isLoading = !initialValues

  return {
    isLoading,
    initialValues,
    handleUpdate,
    handleDelete
  }
}
