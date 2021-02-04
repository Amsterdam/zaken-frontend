import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useSummons } from "app/state/rest/"
import WorkflowForm from "app/features/cases/components/Workflow/WorkflowForm"
import scaffold from "app/features/summons/components/SummonForm/scaffold"
import FormWithExtraLabel from "app/features/shared/components/atoms/FormWithExtraLabel/FormWithExtraLabel"

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