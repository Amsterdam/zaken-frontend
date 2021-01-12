import React from "react"
import { Spinner } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffold from "./scaffold"
import { useTeams, useReasons } from "app/state/rest"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const CreateForm: React.FC<Props> = ({ bagId }) => {

  const teams = useTeams()
  const reasons = useReasons()

  if (teams.data === undefined || reasons.data === undefined) return <Spinner />

  return (
    <ScaffoldForm>
      <ScaffoldFields { ...scaffold(bagId, teams.data, reasons.data) } />
    </ScaffoldForm>
  )
}
export default CreateForm