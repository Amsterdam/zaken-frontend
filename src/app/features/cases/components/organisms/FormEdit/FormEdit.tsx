import React from "react"
import { ScaffoldForm, Alert } from "amsterdam-react-final-form"

import useGlobalState from "app/state/state/useGlobalState"
import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import scaffoldProps from "./scaffold"

const FormEdit: React.FC = () => {
  const { cases: { errorMessage, hasError  } } = useGlobalState()

  return (
    <ScaffoldForm
      // TODO call an update action
      onSubmit={ () => {} }
      hasError={ hasError }
      successComponent={
        <Alert variant="success" title="Zaak succesvol gewijigd!">
          Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        </Alert>
      }
      errorComponent={
        <Alert variant="error" title="Kon de zaak niet opslaan!">
          {
            // @ts-ignore errorMessage is typed as string, while in reality its an object
            errorMessage?.detail
          }
        </Alert>
      }
    >
      <ScaffoldFields {...scaffoldProps} />
    </ScaffoldForm>
  )
}


export default FormEdit
