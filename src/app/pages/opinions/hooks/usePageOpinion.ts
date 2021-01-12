import { navigate } from "@reach/router"
import { useCallback } from "react"

import to from "app/features/shared/routing/to"
import { useOpinions } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

const usePageOpinion = (caseId: Components.Schemas.Case["id"], id?: MockComponents.Schemas.Opinion["id"]) => {
  const { execPost } = useOpinions()
  const { addSuccessFlashMessage } = useFlashMessages()

  const path = `/cases/${ caseId }`

  const handleCreate = useCallback(payload =>
    execPost(payload).then(() => {
      addSuccessFlashMessage(path, "Succes", "De zienswijze is succesvol toegevoegd")
      return navigate(to(path))
    }),
    [addSuccessFlashMessage, path, execPost]
  )

  return { handleCreate }
}

export default usePageOpinion
