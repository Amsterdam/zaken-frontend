
import { FormTitle } from "@amsterdam/asc-ui"

import { useWorkflowProcesses, useWorkflowProcess } from "app/state/rest"
import scaffold from "./scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import useNavigation from "app/routing/useNavigation"

type Props = {
  id: Components.Schemas.CaseDetail["id"]
}

const mapData = (data: { workflowProcess: Components.Schemas.WorkflowOption }) => ({ workflow_option_id: data.workflowProcess.id })

const TaskForm: React.FC<Props> = ({ id }) => {
  const [processes] = useWorkflowProcesses(id)
  const { navigateTo } = useNavigation()
  const fields = useScaffoldedFields(scaffold, id, navigateTo, processes)
  const [, { execPost }] = useWorkflowProcess(id, { lazy: true })

  return (
    <>
      <FormTitle>Gebruik dit formulier om een taak op te voeren</FormTitle>
      <WorkflowForm
        id={ id }
        fields={ fields }
        postMethod={ execPost }
        mapData={ mapData }
      />
    </>
  )
}

export default TaskForm