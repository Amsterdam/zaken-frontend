import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffold from "./scaffold"
import { useCorrespondence } from "app/state/rest"
import { Spinner } from "@amsterdam/asc-ui"

type Props = {
  caseId: Components.Schemas.Case["id"]
  isLoading?: boolean
}

const CorrespondenceForm: React.FC<Props> = ({ caseId }) => {

  const correspondence = useCorrespondence()

  if (correspondence.data === undefined) return <Spinner />

  return (
    <ScaffoldForm>
      <ScaffoldFields {...scaffold( caseId, correspondence.data ) } />
    </ScaffoldForm>  
  )
}

export default CorrespondenceForm
