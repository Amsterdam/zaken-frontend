import { FC } from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffold from "./scaffold"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const addTask = (task: string, caseId: Components.Schemas.Case["id"]) => {
  console.log(`taak ${ task } toegevoegd aan ${ caseId }`)
}

const AddTaskForm: FC<Props> = ({ caseId }) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => addTask(event.target.value, caseId)
  const fields = scaffold(onChange)

  return (
    <div>
      <ScaffoldForm >
        <ScaffoldFields { ...fields } />
      </ScaffoldForm>
    </div>
  )
}

export default AddTaskForm
