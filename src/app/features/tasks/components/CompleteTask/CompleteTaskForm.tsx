import React from "react"

import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"

type Props = {
  onSubmit: (data: Components.Schemas.CamundaTaskComplete) => Promise<unknown>
  isLoading?: boolean
  onCancel: () => void
}

const CompleteTaskForm: React.FC<Props> = ({ isLoading, onSubmit, onCancel }) => 
  <ScaffoldForm
    showSpinner={ isLoading }
    onSubmit={ onSubmit }
    onCancel={ onCancel }
  >
    <ScaffoldFields {...createScaffoldProps(onCancel) } />
  </ScaffoldForm>

export default CompleteTaskForm
