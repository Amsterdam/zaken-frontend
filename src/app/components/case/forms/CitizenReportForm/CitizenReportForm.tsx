import { FormTitle } from "@amsterdam/asc-ui"

import { useCitizenReports } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/CitizenReportForm/scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  id: Components.Schemas.Case["id"]
  camundaTaskId: Components.Schemas.CamundaTask["camunda_task_id"]
}

const CitizenReportForm: React.FC<Props> = ({ id, camundaTaskId }) => {

  const [, { execPost }] = useCitizenReports(id)
  const fields = useScaffoldedFields(scaffold, id)

  return (
    <>
      <FormWithExtraLabel>
        <WorkflowForm
          id={ id }
          postMethod={ execPost }
          fields={ fields }
          camundaTaskId={ camundaTaskId }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default CitizenReportForm