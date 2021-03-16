import { useCallback } from "react"

import { useDebriefings } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import navigateTo from "app/routing/navigateTo"

const usePageDebriefing = (caseId?: Components.Schemas.Case["id"], id?: Components.Schemas.Debriefing["id"]) => {
  const [, { execPost }] = useDebriefings(id, { lazy: true })
  const { addSuccessFlashMessage } = useFlashMessages()

  const path = `/zaken/${ caseId ?? "" }`

  const handleCreate = useCallback(payload =>
    execPost(payload).then(() => {
      addSuccessFlashMessage(path, "Succes", "De debriefing is succesvol toegevoegd")
      return navigateTo(path)
    }),
    [addSuccessFlashMessage, path, execPost]
  )

  return { handleCreate }
}

export default usePageDebriefing
