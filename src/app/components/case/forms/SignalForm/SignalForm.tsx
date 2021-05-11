import { Alert, FormTitle } from "@amsterdam/asc-ui"
import { useParams } from "@reach/router"

import { useSignal } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/forms/SignalForm/scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  id: Components.Schemas.Case["id"]
}

const SignalForm: React.FC<Props> = ({ id }) => {

  const [, { execPost }] = useSignal()
  const fields = useScaffoldedFields(scaffold, id)
  const taskId = useParams().camundaTaskId

  return (
    <>
      <Alert level="warning">Dit formulier nog niet gebruiken! Formulier moet eerst nog werkend gemaakt worden in de back-end</Alert>
      { /* TODO: Add form title or remove */ }
      <FormTitle>&nbsp;</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          id={ id }
          postMethod={ execPost }
          fields={ fields }
          camundaTaskId={ taskId }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default SignalForm