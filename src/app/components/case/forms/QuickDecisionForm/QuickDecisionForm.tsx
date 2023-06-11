import { FormTitle } from "@amsterdam/asc-ui"
import { useCase, useQuickDecisions } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/QuickDecisionForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import DecisionHeader from "../DecisionForm/components/DecisionHeader"
import { useQuickDecisionTypes } from "app/state/rest/themes"

type Props = {
  id: Components.Schemas.CaseDetail["id"]
  caseUserTaskId: Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"]
}

type QuickDecisionData = Omit<Components.Schemas.QuickDecision, "quick_decision_type"> & { quick_decision_type: { id: number } }

const mapData = (data: QuickDecisionData) => ({
  ...data,
  quick_decision_type: data.quick_decision_type.id
})

const QuickDecisionForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const [caseItem] = useCase(id)
  const themeId = caseItem?.theme.id
  const [data] = useQuickDecisionTypes(themeId)
  const quickDecisionTypes = data?.results

  const fields = useScaffoldedFields(scaffold, id, quickDecisionTypes)

  const [, { execPost }] = useQuickDecisions({ lazy: true })

  return (
    <>
      <DecisionHeader caseId={ id } caseUserTaskId={ caseUserTaskId } workflows={ caseItem?.workflows! } />
      <FormTitle>Gebruik dit formulier om aan te geven welk besluit is genomen</FormTitle>
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

export default QuickDecisionForm
