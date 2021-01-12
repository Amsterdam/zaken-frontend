import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"

type Props = {
  caseId: Components.Schemas.Case["id"]
  summonTitle: string | undefined
  onSubmit: (data: MockComponents.Schemas.Opinion) => Promise<void>
  isLoading?: boolean
}


const OpinionForm: React.FC<Props> = ({ caseId, summonTitle = "", isLoading, onSubmit }) => 
 
  <ScaffoldForm
    showSpinner={ isLoading }
    onSubmit={ onSubmit }
    >
    <ScaffoldFields {...createScaffoldProps( caseId, summonTitle ) } />
  </ScaffoldForm>  

export default OpinionForm
