import React from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import createScaffoldProps from "./scaffold"

type Props = {
  caseId: Components.Schemas.Case["id"]
  initialValues?: Partial<Components.Schemas.Debriefing>
  onSubmit: (data: Components.Schemas.Debriefing) => Promise<void>
  onDelete?: () => Promise<void>
  isLoading?: boolean
}

const DebriefForm: React.FC<Props> = ({ caseId, initialValues, isLoading, onSubmit, onDelete }) => (
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ onSubmit }
      initialValues={ initialValues }
    >
      <ScaffoldFields {...createScaffoldProps(caseId, onDelete) } />
    </ScaffoldForm>
  )


export default DebriefForm
