import React from "react"
import { ScaffoldForm, Alert } from "amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import scaffoldProps from "./scaffold"

type Props = {
  errorMessage?: { detail: string }
  hasError: boolean
  onSubmit: (data: API.Case) => Promise<void>
  isLoading: boolean
  caseDetails?: API.Case
}

const FormEdit: React.FC<Props> = ({ isLoading, onSubmit, caseDetails, errorMessage, hasError }) => (
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ onSubmit }
      hasError={ hasError }
      initialValues={ caseDetails }
      // TODO move these components to some sort of a message-system?
      successComponent={
        <Alert variant="success" title="Zaak succesvol gewijzigd!">
          Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        </Alert>
      }
      errorComponent={
        <Alert variant="error" title="Kon de zaak niet opslaan!">
          { errorMessage?.detail }
        </Alert>
      }
    >
      <ScaffoldFields {...scaffoldProps} />
    </ScaffoldForm>
  )


export default FormEdit
