import React, { useEffect } from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useOpinions, useSummon } from "app/state/rest/"
import WorkflowForm from "app/features/cases/components/Workflow/WorkflowForm"
import scaffold from "app/features/opinion/components/OpinionForm/scaffold"
import FormWithExtraLabel from "app/features/shared/components/atoms/FormWithExtraLabel/FormWithExtraLabel"

type Props = {
  id: Components.Schemas.Case["id"]
}

const OpinionForm: React.FC<Props> = ({ id }) => {

  const { data, execPost } = useOpinions()

  // TODO-MOCKED, get summonId/summonTitle from useCaseEvents(caseId)
  const summonId = 6
  const { data: summonData, execGet } = useSummon(summonId, { lazy: true })

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
          caseId={ id! }
          data={ data }
          postMethod={ execPost }
          scaffold= { scaffold }
          extraLabel = { summonData?.title }
        />
        </FormWithExtraLabel>
    </>
  )
}

export default OpinionForm