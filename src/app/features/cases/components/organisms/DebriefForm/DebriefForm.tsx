import React from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import createScaffoldProps from "./scaffold"

type Props = {
  caseId: NonNullable<Components.Schemas.Case["identification"]>
  onSubmit: (data: Components.Schemas.Debriefing) => Promise<void>
  isLoading?: boolean
  initialValues?: Components.Schemas.Debriefing
}

const DebriefForm: React.FC<Props> = ({ caseId, isLoading, onSubmit, initialValues }) => (
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ onSubmit }
      initialValues={ { case: caseId as unknown as number } }
    >
      <ScaffoldFields {...createScaffoldProps(caseId)} />
    </ScaffoldForm>
  )


export default DebriefForm
