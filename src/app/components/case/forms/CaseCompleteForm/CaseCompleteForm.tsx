
import { FormTitle } from "@amsterdam/asc-ui"

import { useCaseClose, useCaseCloseResults, useCaseCloseReasons, useCase } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/CaseCompleteForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  id: Components.Schemas.Case["id"]
  caseUserTaskId: Components.Schemas.CaseUserTask["case_user_task_id"]
}

type CaseCloseTypeFormData = Omit<Components.Schemas.CaseClose, "reason" | "result"> & {
  reason: Components.Schemas.CaseCloseReason
  result: Components.Schemas.CaseCloseResult | null
}
const mapData = (data: CaseCloseTypeFormData): Components.Schemas.CaseClose => (
  {
    ...data,
    reason: data.reason.id,
    result: data.result?.id ?? null
  }
)

const CaseCompleteForm: React.FC<Props> = ({ id, caseUserTaskId }) => {

  const [caseItem] = useCase(id)
  const themeId = caseItem?.theme.id
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
        caseUserTaskId={ caseUserTaskId }
      />
    </>
  )
}

export default CaseCompleteForm