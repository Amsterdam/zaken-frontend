
import { FormTitle } from "@amsterdam/asc-ui"
import { useParams } from "@reach/router"

import { useCamundaProcesses, useCamundaProcess } from "app/state/rest"
import scaffold from "./scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"

type Props = {
  id: Components.Schemas.Case["id"]
}

const mapData = (data: { camundaProcess: Components.Schemas.CamundaProcess }) => ({ camunda_process_id: data.camundaProcess.id })

const TaskForm: React.FC<Props> = ({ id }) => {

  const [processes] = useCamundaProcesses(id)
  const fields = useScaffoldedFields(scaffold, id, processes)
  const [, { execPost }] = useCamundaProcess(id, { lazy: true })
  const taskId = useParams().camundaTaskId

  return (
    <>
      <FormTitle>Gebruik dit formulier om een taak op te voeren</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          id={ id }
          fields={ fields }
          postMethod={ execPost }
          mapData={ mapData }
          camundaTaskId={ taskId }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default TaskForm