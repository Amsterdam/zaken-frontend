import React from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"

import Fields from "./Fields"

import type { CaseVisit } from "../../../hooks/useCaseVisits"

type Props = {
  onSubmit: (data: CaseVisit) => Promise<void>
  isLoading?: boolean
  initialValues?: CaseVisit
}

const Form: React.FC<Props> = ({ isLoading, onSubmit, initialValues }) => (
  <ScaffoldForm
    showSpinner={ isLoading }
    onSubmit={ onSubmit }
    initialValues={ initialValues }
  >
    <Fields initialValues={ initialValues } />
  </ScaffoldForm>
)

export default Form
