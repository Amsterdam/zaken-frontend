import React from "react"
import { ScaffoldForm, Alert } from "amsterdam-react-final-form"

import { useGlobalActions, useGlobalState } from "app/state/state/globalState"
import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import scaffoldProps from "./scaffold"

type Props = {
  caseDetails?: API.Case
}

const FormEdit: React.FC<Props> = ({ caseDetails }) => {
  const {
    cases: { errorMessage, hasError, isGetting: isGettingCases  },
    caseTypes: { isGetting: isGettingCaseTypes }
  } = useGlobalState()

  const { cases: { update } } = useGlobalActions()

  return (
    <ScaffoldForm
      showSpinner={ !caseDetails || isGettingCaseTypes || isGettingCases }
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
