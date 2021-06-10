import { FormTitle } from "@amsterdam/asc-ui"

import scaffold from "./scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import { useCase, useDebriefingCreate, useViolationTypes } from "app/state/rest"

type Props = {
  id: Components.Schemas.Case["id"]
  camundaTaskId: Components.Schemas.CamundaTask["camunda_task_id"]
}

const DebriefCreateForm: React.FC<Props> = ({ id, camundaTaskId }) => {

  const [caseItem] = useCase(id)
  const themeId = caseItem?.theme.id
  const [data] = useViolationTypes(themeId)
  const violationTypes = data?.results
  const [, { execPost }] = useDebriefingCreate()
  const fields = useScaffoldedFields(scaffold, id, violationTypes)

  return (
    <>
      <FormTitle>Geef terugkoppeling van de gehouden debrief</FormTitle>
      <WorkflowForm
        id={ id }
        fields={ fields }
        postMethod={ execPost }
        camundaTaskId={ camundaTaskId }
      />
    </>
  )
}

export default DebriefCreateForm