import React from "react"
import { ScaffoldForm, Alert } from "amsterdam-react-final-form"

import useGlobalActions from "app/state/state/useGlobalActions"
import useGlobalState from "app/state/state/useGlobalState"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import scaffoldProps from "./scaffold"

const FormCreate: React.FC = () => {
  const { cases: { errorMessage, hasError  } } = useGlobalState()
  const { cases: { create } } = useGlobalActions()

  return (
    <ScaffoldForm
      onSubmit={ create }
      hasError={ hasError }
      successComponent={<Alert variant="success" title="Zaak succesvol aangemaakt!">Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</Alert>}
      // @ts-ignore errorMessage is typed as string, while in reality its an object
      errorComponent={<Alert variant="error" title="Kon zaak niet aanmaken!">{ errorMessage?.detail }</Alert>}
    >
      <ScaffoldFields {...scaffoldProps} />
    </ScaffoldForm>
  )
}


export default FormCreate
