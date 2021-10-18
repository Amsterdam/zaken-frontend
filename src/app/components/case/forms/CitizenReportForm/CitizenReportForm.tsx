
import { useCitizenReports } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/CitizenReportForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  id: Components.Schemas.Case["id"]
  caseUserTaskId: Components.Schemas.CaseUserTask["case_user_task_id"]
}

const CitizenReportForm: React.FC<Props> = ({ id, caseUserTaskId }) => {

  const [, { execPost }] = useCitizenReports(id)
  const fields = useScaffoldedFields(scaffold, id)

  return (
    <WorkflowForm
      id={ id }
      postMethod={ execPost }
      fields={ fields }
      caseUserTaskId={ caseUserTaskId }
    />
  )
}

export default CitizenReportForm