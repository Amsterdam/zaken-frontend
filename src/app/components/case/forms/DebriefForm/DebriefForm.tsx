import { FormTitle } from "@amsterdam/asc-ui"

import scaffold from "./scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import { useDebriefingCreate } from "app/state/rest"

type Props = {
  id: Components.Schemas.Case["id"]
  camundaTaskId: Components.Schemas.CamundaTask["camunda_task_id"]
}

const DebriefCreateForm: React.FC<Props> = ({ id, camundaTaskId }) => {

  const [, { execPost }] = useDebriefingCreate()
  const fields = useScaffoldedFields(scaffold, id)

  return (
    <>
      <FormTitle>Geef terugkoppeling van de gehouden debrief</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          id={ id }
          fields={ fields }
          postMethod={ execPost }
          camundaTaskId={ camundaTaskId }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default DebriefCreateForm