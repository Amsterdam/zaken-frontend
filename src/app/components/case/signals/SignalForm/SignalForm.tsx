import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useSignal } from "app/state/rest/"
import WorkflowForm from "app/components/cases/Workflow/WorkflowForm"
import scaffold from "app/components/case/signals/SignalForm/scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"

type Props = {
  id: Components.Schemas.Case["id"]
}


const SignalForm: React.FC<Props> = ({ id }) => {

  const [, { execPost }] = useSignal({ lazy: true })
  
  return (
    <>
      <FormTitle>Rapporteer de extra melding</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          caseId={ id }
          data={ {} }
          postMethod={ execPost }
          scaffold={ scaffold }
          initialValues={ { case: id } }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default SignalForm