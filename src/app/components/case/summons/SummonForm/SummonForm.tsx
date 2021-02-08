import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useSummons } from "app/state/rest/"
import WorkflowForm from "app/components/cases/Workflow/WorkflowForm"
import scaffold from "app/components/case/summons/SummonForm/scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"

type Props = {
  id: Components.Schemas.Case["id"]
}

const SummonForm: React.FC<Props> = ({ id }) => {

  const { data, execPost } = useSummons()

  return (
    <>
      <FormTitle>Gebruik dit formulier om aan te geven welke aanschrijving(en) opgesteld is en voor wie. Vul dit in nadat brief verstuurd is!</FormTitle>
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

export default SummonForm