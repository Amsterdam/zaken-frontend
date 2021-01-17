import React from "react"
import { Spinner } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffold from "./scaffold"
import { useCompleteCase } from "app/state/rest"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const CompleteCaseForm: React.FC<Props> = ({ caseId }) => {

  const completecase = useCompleteCase()

  if (completecase.data === undefined ) return <Spinner />

  return (
    <ScaffoldForm>
      <ScaffoldFields { ...scaffold(caseId, completecase.data) } />
    </ScaffoldForm>
  )
}
export default CompleteCaseForm