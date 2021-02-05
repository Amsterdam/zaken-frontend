import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCompleteCase } from "app/state/rest/"
import WorkflowForm from "app/features/cases/Workflow/WorkflowForm"
import scaffold from "app/features/cases/CaseCompleteForm/scaffold"

type Props = {
  id: Components.Schemas.Case["id"]
}

const CaseCompleteForm: React.FC<Props> = ({ id }) => {

  const { data, execPost } = useCompleteCase()

  return (
    <>
      <FormTitle>Gebruik dit formulier om de zaak af te ronden</FormTitle>
      <WorkflowForm
        caseId={ id }
        data={ data }
        postMethod={ execPost }
        scaffold={ scaffold }
      />
    </>
  )
}

export default CaseCompleteForm