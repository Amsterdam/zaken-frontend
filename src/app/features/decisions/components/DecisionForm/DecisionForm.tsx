import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useDecisions } from "app/state/rest/"
import WorkflowForm from "app/features/cases/components/Workflow/WorkflowForm"
import scaffold from "app/features/decisions/components/DecisionForm/scaffold"
import FormWithExtraLabel from "app/features/shared/components/atoms/FormWithExtraLabel/FormWithExtraLabel"

type Props = {
  id: Components.Schemas.Case["id"]
}

const DecisionForm: React.FC<Props> = ({ id }) => {

    const { data, execPost } = useDecisions()

  return (
    <>
      <FormTitle>Gebruik dit formulier om aan te geven welk besluit is genomen</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
            caseId={ id }
            data={ data }
            postMethod={ execPost }
            scaffold={ scaffold }
        />
        </FormWithExtraLabel>
    </>
  )
}

export default DecisionForm