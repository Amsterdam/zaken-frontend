import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffoldProps from "./scaffold"

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
    <ScaffoldFields { ...scaffoldProps } />
  </ScaffoldForm>
)

export default Form
