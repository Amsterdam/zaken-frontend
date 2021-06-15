import { FormTitle } from "@amsterdam/asc-ui"

import { useCase, useDecisions } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/DecisionForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import DecisionHeader from "./components/DecisionHeader"
import { useDecisionTypes } from "app/state/rest/themes"
//import stripThousandSeparator from "./utils/stripThousandSeparator"

type Props = {
  id: Components.Schemas.Case["id"]
  camundaTaskId: Components.Schemas.CamundaTask["camunda_task_id"]
}

type DecisionData = Omit<Components.Schemas.Decision, "decision_type"> & { decision_type: { id: number } }
const mapData = (data: DecisionData) => {
  const decision_type = data.decision_type.id
  // TODO: Move this to amsterdam-react-final-form
  //const sanctionAmount = data.sanction_amount ? Math.round(parseFloat(stripThousandSeparator(data.sanction_amount))) : Number.NaN
  //const sanction_amount = !Number.isNaN(sanctionAmount) ? sanctionAmount : undefined
  return {
    ...data,
    decision_type//,
    //sanction_amount
  }
}

const DecisionForm: React.FC<Props> = ({ id, camundaTaskId }) => {

  const [caseItem] = useCase(id)
  const themeId = caseItem?.theme.id
  const [data] = useDecisionTypes(themeId)
  const decisionTypes = data?.results

  const fields = useScaffoldedFields(scaffold, id, decisionTypes)

  const [, { execPost }] = useDecisions({ lazy: true })

  return (
    <>
      <DecisionHeader caseId={ id }/>
      <FormTitle>Gebruik dit formulier om aan te geven welk besluit is genomen</FormTitle>
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

export default DecisionForm