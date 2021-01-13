import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffold from "./scaffold"
import { useSummons } from "app/state/rest"
import { Spinner } from "@amsterdam/asc-ui"

type Props = {
  caseId: Components.Schemas.Case["id"]
  isLoading?: boolean
}

const SummonForm: React.FC<Props> = ({ caseId, isLoading }) => {

  const summons = useSummons()

  if (summons.data === undefined) return <Spinner />

  return (
    <ScaffoldForm>
      <ScaffoldFields {...scaffold( caseId, summons.data ) } />
    </ScaffoldForm>  
  )
}

export default SummonForm
