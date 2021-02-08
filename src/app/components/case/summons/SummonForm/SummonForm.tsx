import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useSummons, useSummonsMocked } from "app/state/rest/"
import WorkflowForm from "app/components/cases/Workflow/WorkflowForm"
import scaffold from "app/components/case/summons/SummonForm/scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"

type Props = {
  id: Components.Schemas.Case["id"]
  initialValues?: Partial<Components.Schemas.Summon>
}

const SummonForm: React.FC<Props> = ({ id }) => {

  const { data } = useSummonsMocked()
  const { execPost } = useSummons()

  return (
    <>
      <FormTitle>Gebruik dit formulier om aan te geven welke aanschrijving(en) opgesteld is en voor wie. Vul dit in nadat brief verstuurd is!</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
            caseId={ id }
            data={ data }
            postMethod={ execPost }
            scaffold={ scaffold }
            initialValues = { { case: id } }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default SummonForm