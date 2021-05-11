
import { FormTitle } from "@amsterdam/asc-ui"
import { useParams } from "@reach/router"

import { useCompleteCases, useCompleteCase, useCompleteCasesReasonsYes, useCompleteCasesReasonsNo } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/CaseCompleteForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  id: Components.Schemas.Case["id"]
}

const CaseCompleteForm: React.FC<Props> = ({ id }) => {

  const [completeCases] = useCompleteCases()
  const [completeCaseReasonsYes] = useCompleteCasesReasonsYes()
  const [completeCaseReasonsNo] = useCompleteCasesReasonsNo()
  const [, { execPost }] = useCompleteCase()
  const taskId = useParams().camundaTaskId
  const fields = useScaffoldedFields(scaffold, id, completeCases)

  return (
    <>
      <FormTitle>Gebruik dit formulier om de zaak af te ronden</FormTitle>
      <WorkflowForm
        id={ id }
        fields={ fields }
        postMethod={ execPost }
        camundaTaskId={ taskId }
      />
    </>
  )
}

export default CaseCompleteForm