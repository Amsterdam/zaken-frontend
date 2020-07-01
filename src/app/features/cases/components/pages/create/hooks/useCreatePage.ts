import { useCrudCreate } from "app/features/shared/hooks/useCrud/useCrud"
import to from "app/features/shared/routing/to"

const useCreatePage = () => {
  const handleCreate = useCrudCreate({
    stateKey: "cases",
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
