import React from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import scaffoldProps from "./scaffold"

type Props = {
  errorMessage?: { detail: string }
  hasError: boolean
  onSubmit: (data: API.Case) => Promise<void>
  isLoading: boolean
  caseDetails?: API.Case
}

const FormEdit: React.FC<Props> = ({ isLoading, onSubmit, caseDetails }) => (
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ onSubmit }
      initialValues={ caseDetails }
    >
      <ScaffoldFields {...scaffoldProps} />
    </ScaffoldForm>
  )


export default FormEdit
