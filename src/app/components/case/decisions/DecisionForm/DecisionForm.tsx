import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useDecisions } from "app/state/rest/"
import WorkflowForm from "app/components/cases/Workflow/WorkflowForm"
import scaffold from "app/components/case/decisions/DecisionForm/scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"

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