import { FC, useMemo } from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCompleteCase } from "app/state/rest/"
import WorkflowForm from "app/components/case/Workflow/WorkflowForm"
import scaffold from "app/components/cases/CaseCompleteForm/scaffold"

type Props = {
  id: Components.Schemas.Case["id"]
}

const CaseCompleteForm: FC<Props> = ({ id }) => {

  const [completeCases, { execPost }] = useCompleteCase()
  const fields = useMemo(
    () => completeCases !== undefined ? scaffold(id, completeCases) : undefined,
    [id, completeCases]
  )

  return (
    <>
      <FormTitle>Gebruik dit formulier om de zaak af te ronden</FormTitle>
      <WorkflowForm
        caseId={ id }
        fields={ fields }
        postMethod={ execPost }
      />
    </>
  )
}

export default CaseCompleteForm