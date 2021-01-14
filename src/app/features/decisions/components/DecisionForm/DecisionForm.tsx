import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffold from "./scaffold"
import { useDecisions } from "app/state/rest"
import { Spinner } from "@amsterdam/asc-ui"

type Props = {
  caseId: Components.Schemas.Case["id"]
  isLoading?: boolean
}

const DecisionForm: React.FC<Props> = ({ caseId }) => {

  const decisions = useDecisions()

  if (decisions.data === undefined) return <Spinner />

  return (
    <ScaffoldForm>
      <ScaffoldFields {...scaffold( caseId, decisions.data ) } />
    </ScaffoldForm>  
  )
}

export default DecisionForm
