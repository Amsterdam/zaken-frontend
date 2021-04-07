import { useCallback } from "react"

import { useDebriefings } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import navigateTo from "app/routing/navigateTo"

const usePageDebriefing = (caseId: Components.Schemas.Case["id"], id?: Components.Schemas.Debriefing["id"]) => {
  const [, { execPost }] = useDebriefings(id, { lazy: true })
  const { addSuccessFlashMessage } = useFlashMessages()

  const handleCreate = useCallback(payload =>
    execPost(payload).then(() => {
      addSuccessFlashMessage(`/zaken/${ caseId }`, "Succes", "De debriefing is succesvol toegevoegd")
      return navigateTo("/zaken/:id", { id: caseId })
    }),
    [addSuccessFlashMessage, caseId, execPost]
  )

  return { handleCreate }
}

export default usePageDebriefing
