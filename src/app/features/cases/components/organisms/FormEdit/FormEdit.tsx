import React from "react"
import { ScaffoldForm, Alert, DebugFormState } from "amsterdam-react-final-form"

import { useGlobalActions, useGlobalState } from "app/state/state/globalState"
import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import scaffoldProps from "./scaffold"
import { useCaseByUUID } from "../../../hooks/useCaseByUUID"

type Props = {
  caseDetails: API.Case
}

const FormEdit: React.FC<Props> = ({ caseDetails }) => {
  const { cases: { errorMessage, hasError  } } = useGlobalState()
  const { cases: { update } } = useGlobalActions()

  return (
    <ScaffoldForm
      onSubmit={ update }
      hasError={ hasError }
      initialValues={ caseDetails }
      successComponent={
        <Alert variant="success" title="Zaak succesvol gewijzigd!">
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
