import React from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import createScaffoldProps from "./scaffold"

type Props = {
  caseId: Components.Schemas.Case["id"]
  initialValues?: Partial<Components.Schemas.Debriefing>
  onSubmit: (data: Components.Schemas.Debriefing) => Promise<void>
  isLoading?: boolean
}

const DebriefForm: React.FC<Props> = ({ caseId, initialValues, isLoading, onSubmit }) => (
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ onSubmit }
      initialValues={ initialValues ?? { case: caseId } }
    >
      <ScaffoldFields {...createScaffoldProps(caseId, initialValues !== undefined) } />
    </ScaffoldForm>
  )


export default DebriefForm
