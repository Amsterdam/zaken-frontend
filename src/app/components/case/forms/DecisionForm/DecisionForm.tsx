import { FormTitle } from "@amsterdam/asc-ui"

import { useCase, useDecisions } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/DecisionForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import DecisionHeader from "./components/DecisionHeader"
import { useDecisionTypes } from "app/state/rest/themes"
import stripThousandSeparator from "./utils/stripThousandSeparator"

type Props = {
  id: Components.Schemas.CaseDetail["id"]
  caseUserTaskId: Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"]
}

type DecisionData = Omit<Components.Schemas.Decision, "decision_type"> & { decision_type: { id: number }, description_closing?: string }
const mapData = (data: DecisionData) => {

  const decision_type = data.decision_type.id
  const sanctionAmount = data.sanction_amount ? Math.round(parseFloat(stripThousandSeparator(data.sanction_amount))) : Number.NaN
  const sanction_amount = !Number.isNaN(sanctionAmount) ? sanctionAmount : undefined
  const description = data.description ?? data.description_closing
  return {
    ...data,
    decision_type,
    sanction_amount,
    description
  }
}

const DecisionForm: React.FC<Props> = ({ id, caseUserTaskId }) => {

  const [caseItem] = useCase(id)
  const themeId = caseItem?.theme.id
  const [data] = useDecisionTypes(themeId)
  const decisionTypes = data?.results

  const fields = useScaffoldedFields(scaffold, id, decisionTypes)

  const [, { execPost }] = useDecisions({ lazy: true })

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

export default DecisionForm