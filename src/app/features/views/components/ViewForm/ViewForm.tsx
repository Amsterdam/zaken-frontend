import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"

type Props = {
  caseId: Components.Schemas.Case["id"]
  onSubmit: (data: MockComponents.Schemas.View) => Promise<void>
  isLoading?: boolean
}

const ViewForm: React.FC<Props> = ({ caseId, isLoading, onSubmit }) => 
  <ScaffoldForm
    showSpinner={ isLoading }
    onSubmit={ onSubmit }
    >
    <ScaffoldFields {...createScaffoldProps(caseId) } />
  </ScaffoldForm>  


export default ViewForm
