import { FC } from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useTasks } from "app/state/rest"
import scaffold from "./scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import WorkflowForm from "app/components/case/Workflow/WorkflowForm"

type Props = {
  id: Components.Schemas.Case["id"]
}

const TaskForm: FC<Props> = ({ id }) => {

  const [tasks] = useTasks(id)

  const fields = useScaffoldedFields(scaffold, id, tasks)

  //const [, { execPost }] = useTasks({ lazy: true })
  const postMethod = async (data: any) => {} //await execPost(data)

  return (
    <>
      <FormTitle>Gebruik dit formulier om een taak op te voeren</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          id={ id }
          fields={ fields }
          postMethod={ postMethod }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default TaskForm