import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffold from "./scaffold"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const addTask = (task: string, caseId: Components.Schemas.Case["id"]) => {
  console.log(`taak ${ task } toegevoegd aan ${ caseId }`)
}

const AddTaskForm: React.FC<Props> = ({ caseId }) => {
  const onChange = (event: any) => addTask(event.target.value, caseId)

  return (
    <div>
      <ScaffoldForm >
        <ScaffoldFields { ...scaffold(onChange) } />
      </ScaffoldForm>
    </div>
  )
}

export default AddTaskForm
