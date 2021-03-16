import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useDecisions } from "app/state/rest/"
import WorkflowForm from "app/components/cases/Workflow/WorkflowForm"
import scaffold from "app/components/case/decisions/DecisionForm/scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import DecisionHeader from "../DecisionHeader"
import MockWrapper from "app/components/shared/MockWrapper/MockWrapper"

type Props = {
  id: Components.Schemas.Case["id"]
}

const DecisionForm: React.FC<Props> = ({ id }) => {

  const [decisions, { execPost }] = useDecisions()

  return (
    <>
      <MockWrapper>
        <DecisionHeader caseId={ id }/>
      </MockWrapper>
      <FormTitle>Gebruik dit formulier om aan te geven welk besluit is genomen</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
            caseId={ id }
            data={ decisions }
            postMethod={ execPost }
            scaffold={ scaffold }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default DecisionForm