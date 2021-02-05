import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCorrespondence } from "app/state/rest/"
import WorkflowForm from "app/components/cases/Workflow/WorkflowForm"
import scaffold from "app/components/correspondence/CorrespondenceForm/scaffold"
import FormWithExtraLabel from "app/components/shared/components/atoms/FormWithExtraLabel/FormWithExtraLabel"

type Props = {
  id: Components.Schemas.Case["id"]
}

const CorrespondenceForm: React.FC<Props> = ({ id }) => {

  const { data, execPost } = useCorrespondence()

  return (
    <>
      <FormTitle>Gebruik dit formulier om notitie van correspondentie toe te voegen</FormTitle>
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

export default CorrespondenceForm
