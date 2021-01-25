import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import createScaffoldProps from "./scaffold"

type Props = {
  onSubmit: any
  isLoading?: boolean
}

const CompleteTaskForm: React.FC<Props> = ({ isLoading, onSubmit }) => 
  <ScaffoldForm
    showSpinner={ isLoading }
    onSubmit={ onSubmit }
  >
    <ScaffoldFields {...createScaffoldProps() } />
  </ScaffoldForm>

export default CompleteTaskForm