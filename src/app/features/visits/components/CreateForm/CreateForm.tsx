import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import createScaffoldProps from "./scaffold"

type Props = {
  caseId: Components.Schemas.Case["id"]
  initialValues?: Partial<Components.Schemas.Visit>
  onSubmit: (data: Components.Schemas.Visit) => Promise<unknown>
  isLoading?: boolean
}

const VisitForm: React.FC<Props> = ({ caseId, isLoading, onSubmit }) => 
  <ScaffoldForm
    showSpinner={ isLoading }
    onSubmit={ onSubmit }
  >
    <ScaffoldFields {...createScaffoldProps(caseId) } />
  </ScaffoldForm>  

export default VisitForm
