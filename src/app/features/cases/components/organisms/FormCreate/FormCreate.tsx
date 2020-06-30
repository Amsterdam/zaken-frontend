import React from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"

import to from "app/features/shared/routing/to"
import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { useCrudCreate } from "app/features/shared/hooks/useCrud/useCrud"

import scaffoldProps from "./scaffold"

const FormCreate: React.FC = () => {
  const handleCreate = useCrudCreate({
    stateKey: "cases",
    redirectTo: to("/cases"),
    success: { title: "Zaak aangemaakt", body: "De zaak is succesvol aangemaakt" },
    error: { title: "Kon zaak niet aanmaken" }
  })

  return (
    <ScaffoldForm onSubmit={ handleCreate }>
      <ScaffoldFields {...scaffoldProps} />
    </ScaffoldForm>
  )
}


export default FormCreate
