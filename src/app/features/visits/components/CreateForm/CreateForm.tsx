import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import createScaffoldProps from "./scaffold"

type Props = {
  caseId: Components.Schemas.Case["id"]
  initialValues?: Partial<MockComponents.Schemas.Visit>
  // onSubmit: (data: MockComponents.Schemas.Visit) => Promise<void>
  isLoading?: boolean
}

const VisitForm: React.FC<Props> = ({ caseId, initialValues, isLoading }) => 
  <ScaffoldForm
    showSpinner={ isLoading }
    // onSubmit={ onSubmit }
    initialValues={ initialValues ?? { case: caseId } }
  >
    <ScaffoldFields {...createScaffoldProps(caseId, initialValues !== undefined) } />
  </ScaffoldForm>  

export default VisitForm
