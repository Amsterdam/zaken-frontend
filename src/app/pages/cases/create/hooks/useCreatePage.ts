import { navigate } from "@reach/router"
import { useCallback } from "react"

import to from "app/features/shared/routing/to"
import { useCases } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

const useCreatePage = () => {
  const { execPost } = useCases()
  const { addSuccessFlashMessage } = useFlashMessages()

  const handleCreate = useCallback(payload =>
    execPost(payload).then(() => {
      addSuccessFlashMessage("/cases", "Succesvol aangemaakt", "De zaak is succesvol aangemaakt")
      return navigate(to("/cases"))
    }),
    [addSuccessFlashMessage, execPost]
  )

  return { handleCreate }
}

export default useCreatePage
