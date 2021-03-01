import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffold from "./scaffold"
import navigateTo from "app/routing/navigateTo"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const goToUrl = (value: string, caseId: Components.Schemas.Case["id"]) => {
  switch(value) {
    case "1":
      return navigateTo(`/zaken/${ caseId }/aanschrijving`)
    default:
      return navigateTo(`/zaken/${ caseId }`)
  }
}

const AddTaskForm: React.FC<Props> = ({ caseId }) => {
  const onChange = (event: any) => goToUrl(event.target.value, caseId)

  return (
    <div>
      <ScaffoldForm >
        <ScaffoldFields { ...scaffold(onChange) } />
      </ScaffoldForm>
    </div>
  )
}

export default AddTaskForm
