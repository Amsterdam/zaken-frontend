import React from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import createScaffoldProps from "./scaffold"

type Props = {
  caseId: Components.Schemas.Case["id"]
  onSubmit: (data: Components.Schemas.Debriefing) => Promise<void>
  onDelete?: () => Promise<void>
  isLoading?: boolean
  initialValues?: Partial<Components.Schemas.Debriefing>
}

const DebriefForm: React.FC<Props> = ({ caseId, isLoading, onSubmit, onDelete }) => (
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ onSubmit }
      initialValues={ { case: caseId } }
    >
      <ScaffoldFields {...createScaffoldProps(caseId, onDelete) } />
    </ScaffoldForm>
  )


export default DebriefForm
