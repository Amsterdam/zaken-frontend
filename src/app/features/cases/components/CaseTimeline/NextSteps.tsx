import React from "react"

import NextStep from "./NextStep"
import { useCaseEvents } from "app/state/rest"
import workflow from "app/state/workflow/workflow"
import { mapCaseType } from "./helpers/Helpers"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const NextSteps: React.FC<Props> = ({ caseId }) => {

  const { data } = useCaseEvents(caseId)
  const { shouldCreateDebriefing, shouldCreateVisit, shouldCreateViolation, shouldCloseCase, shouldCreateAdditionalVisit } = workflow(data, true)
  const { debriefIsDone } = workflow(data)

  return (
    <>
      { shouldCreateDebriefing &&
        <NextStep title={ mapCaseType("DEBRIEFING") } />
      }
      { (shouldCreateVisit || shouldCreateAdditionalVisit) &&
        <NextStep title={ mapCaseType("VISIT") } />
      }
      { debriefIsDone && shouldCreateViolation &&
        <NextStep title="Overtreding" />
      }
      { debriefIsDone && shouldCloseCase &&
        <NextStep title="Zaak afsluiten" />
      }
    </>
  )
}
export default NextSteps
