
import { FormTitle } from "@amsterdam/asc-ui"

import { useCompleteCase, useCompleteCaseResults, useCompleteCasesReasons } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/CaseCompleteForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  id: Components.Schemas.Case["id"]
  camundaTaskId: Components.Schemas.CamundaTask["camunda_task_id"]
}

const CaseCompleteForm: React.FC<Props> = ({ id, camundaTaskId }) => {

  const [caseClose] = useCompleteCaseResults()
  const [caseCloseReasons] = useCompleteCasesReasons()
  const [, { execPost }] = useCompleteCase()
  const fields = useScaffoldedFields(scaffold, id, caseClose, caseCloseReasons?.results)

  return (
    <>
      <FormTitle>Gebruik dit formulier om de zaak af te ronden</FormTitle>
      <WorkflowForm
        id={ id }
        fields={ fields }
        postMethod={ execPost }
        camundaTaskId={ camundaTaskId }
      />
    </>
  )
}

export default CaseCompleteForm