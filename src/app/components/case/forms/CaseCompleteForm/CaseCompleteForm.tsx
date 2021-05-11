
import { FormTitle } from "@amsterdam/asc-ui"
import { useParams } from "@reach/router"

import { useCompleteCaseResults, useCompleteCasesReasons } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/CaseCompleteForm/scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  id: Components.Schemas.Case["id"]
}

const CaseCompleteForm: React.FC<Props> = ({ id }) => {

  const [completeCaseResults] = useCompleteCaseResults()
  const [completeCaseReasons] = useCompleteCasesReasons()
  const [, { execPost }] = useCompleteCaseResults()
  const taskId = useParams().camundaTaskId
  const fields = useScaffoldedFields(scaffold, id, completeCaseResults, completeCaseReasons)

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