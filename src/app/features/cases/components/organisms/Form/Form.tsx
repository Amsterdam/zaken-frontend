import React from "react"
import { DebugFormValues, ScaffoldForm } from "amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import scaffoldProps from "./scaffold"

type Props = {
  onSubmit: (data: API.Case) => Promise<void>
  isLoading?: boolean
  initialValues?: API.Case
}

const Form: React.FC<Props> = ({ isLoading, onSubmit, initialValues }) => (
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ onSubmit }
      initialValues={ initialValues }
    >
      <ScaffoldFields {...scaffoldProps} />
    </ScaffoldForm>
  )


export default Form
