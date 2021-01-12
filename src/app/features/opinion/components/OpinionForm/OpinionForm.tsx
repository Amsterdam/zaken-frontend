import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"

type Props = {
  caseId: Components.Schemas.Case["id"]
  summonTitle: string | undefined
  isLoading?: boolean
}


const OpinionForm: React.FC<Props> = ({ caseId, summonTitle = "", isLoading }) => 
 
  <ScaffoldForm
    showSpinner={ isLoading }
    >
    <ScaffoldFields {...createScaffoldProps( caseId, summonTitle ) } />
  </ScaffoldForm>  

export default OpinionForm
