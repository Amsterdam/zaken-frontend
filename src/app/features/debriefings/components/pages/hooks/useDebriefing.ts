import { navigate } from "@reach/router"
import { useCallback } from "react"

import to from "app/features/shared/routing/to"
import { useDebriefings } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

const useDebriefing = (caseId: Components.Schemas.Case["id"], id?: Components.Schemas.Debriefing["id"]) => {
  const { execPost, execPut, execDelete } = useDebriefings(id, { lazy: true })
  const { addSuccessFlashMessage } = useFlashMessages()

  const path = `/cases/${ caseId }`

  const handleCreate = useCallback(payload =>
    execPost(payload).then(() => {
      addSuccessFlashMessage(path, "Succes", "De debriefing is succesvol toegevoegd")
      return navigate(to(path))
    }),
    [addSuccessFlashMessage, path, execPost]
  )

  const handleUpdate = useCallback(payload =>
    execPut(payload).then(() => {
      addSuccessFlashMessage(path, "Succes", "De debriefing is succesvol gewijzigd")
      return navigate(to(path))
    }),
    [addSuccessFlashMessage, path, execPut]
  )

  const handleDelete = useCallback(() =>
    execDelete().then(() => {
      addSuccessFlashMessage(path, "Succes", "De debriefing is succesvol verwijderd")
      return navigate(to(path))
    }),
    [addSuccessFlashMessage, path, execDelete]
  )

  return { handleCreate, handleUpdate, handleDelete }
}

export default useDebriefing
