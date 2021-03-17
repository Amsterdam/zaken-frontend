import React, { useEffect } from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useOpinions } from "app/state/rest/"
import WorkflowForm from "app/components/cases/Workflow/WorkflowForm"
import scaffold from "app/components/case/opinions/OpinionForm/scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"
import { useSummonTypes } from "app/state/rest/case"

type Props = {
  id: Components.Schemas.Case["id"]
}

const OpinionForm: React.FC<Props> = ({ id }) => {

  const [opinions, { execPost }] = useOpinions()

  // TODO-MOCKED, get summonId/summonTitle from useCaseEvents(caseId)
  const summonId = 6
  const [summon, { execGet }] = useSummonTypes(summonId, { lazy: true })

  useEffect(() => {
      if (summonId === undefined) return
      execGet()
    },
    [summonId, execGet]
  )

  return (
    <>
      <FormTitle>Gebruik dit formulier om aan te geven wat de beoordeling van de zienswijze is</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          caseId={ id }
          data={ opinions }
          postMethod={ execPost }
          scaffold={ scaffold }
          extraLabel={ summon?.title }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default OpinionForm