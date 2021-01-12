import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"
import { useSummons } from "app/state/rest"

type Props = {
  caseId: Components.Schemas.Case["id"]
  summonId: number
  onSubmit: (data: MockComponents.Schemas.Opinion) => Promise<void>
  isLoading?: boolean
}

const OpinionForm: React.FC<Props> = ({ caseId, summonId, isLoading, onSubmit }) => {
  console.log("summon", useSummons() )

  return (
  <ScaffoldForm
    showSpinner={ isLoading }
    onSubmit={ onSubmit }
    >
    <ScaffoldFields {...createScaffoldProps(caseId) } />
  </ScaffoldForm>  
  )
}
export default OpinionForm
