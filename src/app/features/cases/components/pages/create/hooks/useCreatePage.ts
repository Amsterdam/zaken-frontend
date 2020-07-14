import { useCrud } from "app/features/shared/hooks/useCrud/useCrud"
import to from "app/features/shared/routing/to"
import { useCases } from "app/state/rest/config"

const useCreatePage = () => {
  const { execPost } = useCases()

  const handleCreate = useCrud({
    action: execPost,
    redirectTo: to("/cases"),
    success: {
      title: "Succesvol aangemaakt",
      body: "De zaak is succesvol aangemaakt"
    },
    error: {
      title: "Kon niet aanmaken"
    }
  })

  return { handleCreate }
}

export default useCreatePage
