import { Alert, FormTitle } from "@amsterdam/asc-ui"

import { useSignal } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "app/components/case/SignalForm/scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  id: Components.Schemas.Case["id"]
}

const SignalForm: React.FC<Props> = ({ id }) => {

  const fields = useScaffoldedFields(scaffold, id)
  const [, { execPost }] = useSignal({ lazy: true })

  return (
    <>
    <Alert level="warning">Dit formulier nog niet gebruiken! Formulier moet eerst nog werkend gemaakt worden in de back-end</Alert>
      <FormTitle>&nbsp;</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          id={ id }
          postMethod={ execPost }
          fields={ fields }
          initialValues={ { case: id } }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default SignalForm