import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffold from "./scaffold"
import { useOpinions } from "app/state/rest"
import { Spinner } from "@amsterdam/asc-ui"

type Props = {
  caseId: Components.Schemas.Case["id"]
  summonTitle: string | undefined
  isLoading?: boolean
}


const OpinionForm: React.FC<Props> = ({ caseId, summonTitle = "" }) => {

  const opinions = useOpinions()

  if (opinions.data === undefined) return <Spinner />
 
  return(
    <ScaffoldForm>
      <ScaffoldFields {...scaffold( caseId, opinions.data, summonTitle ) } />
    </ScaffoldForm>  
  )
}

export default OpinionForm
