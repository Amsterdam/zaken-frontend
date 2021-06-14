
import { FormTitle } from "@amsterdam/asc-ui"

import { useCaseClose, useCaseCloseResults, useCaseCloseReasons, useCase } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/CaseCompleteForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  id: Components.Schemas.Case["id"]
  camundaTaskId: Components.Schemas.CamundaTask["camunda_task_id"]
}

type CaseCloseTypeFormData = Omit<Components.Schemas.CaseClose, "reason" | "result"> & {
  reason: Components.Schemas.CaseCloseReason
  result: Components.Schemas.CaseCloseResult
}
const mapData = (data: CaseCloseTypeFormData): Components.Schemas.CaseClose => (
  {
    ...data,
    reason: data.reason.id,
    result: data.result.id
  }
)

const CaseCompleteForm: React.FC<Props> = ({ id, camundaTaskId }) => {

  const themeId = useCase(id)[0]?.theme.id
  const [caseCloseReasons] = useCaseCloseReasons(themeId)
  const [caseCloseResults] = useCaseCloseResults(themeId)
  const [, { execPost }] = useCaseClose()
  const fields = useScaffoldedFields(scaffold, id, caseCloseReasons?.results, caseCloseResults?.results)

  return (
    <>
      <FormTitle>Gebruik dit formulier om de zaak af te ronden</FormTitle>
      <WorkflowForm
        id={ id }
        fields={ fields }
        mapData={ mapData }
        postMethod={ execPost }
        camundaTaskId={ camundaTaskId }
      />
    </>
  )
}

export default CaseCompleteForm