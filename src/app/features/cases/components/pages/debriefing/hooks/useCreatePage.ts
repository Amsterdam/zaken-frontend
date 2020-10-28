import { navigate } from "@reach/router"
import { useCallback } from "react"

import to from "app/features/shared/routing/to"
import { useDebriefings } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

const useCreatePage = (caseId: Components.Schemas.Case["id"]) => {
  const { execPost } = useDebriefings({ lazy: true })
  const { addSuccessFlashMessage } = useFlashMessages()

  const handleCreate = useCallback(payload =>
    execPost(payload).then(() => {
      const path = `/cases/${ caseId }`
      addSuccessFlashMessage(path, "Succes", "De debriefing is succesvol toegevoegd")
      return navigate(to(path))
    }),
    [addSuccessFlashMessage, execPost, caseId]
  )

  return { handleCreate }
}

export default useCreatePage
