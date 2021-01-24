import React, { useEffect } from "react"

import { useCaseEvents, useSummon } from "app/state/rest"
import workflow from "app/state/workflow/workflow"
import WorkflowStatus from "./WorkflowStatus"
import MockWrapper from "app/features/shared/components/molecules/MockWrapper/MockWrapper"
import { workflowDebrief, workflowCloseCase, workflowDecision, workflowOpinion, workflowSummon, workflowViolation, workflowVisit } from "./WorkflowMocks"

type Props = {
  caseId: Components.Schemas.Case["id"]
  summonId?: number
}

type taskAction = {
  title: string
  target: string
}

export const taskActionMap = {
  "task_visit_succesful": { title: "Huisbezoek compleet", target: "visits" }
} as Record<string, taskAction>

const Workflow: React.FC<Props> = ({ caseId, summonId }) => {
  const dataCase = useCaseEvents(caseId).data
  const { data, execGet } = useSummon(summonId, { lazy: true })
  const {
    shouldCreateVisit,
    shouldCreateDebriefing,
    shouldCloseCase,
    shouldCreateViolation,
    shouldCreateAdditionalVisit
  } = workflow(dataCase)

  // TODO-MOCKED, get summonId/summonTitle from useCaseEvents(caseId)
  useEffect(() => {
    if (summonId === undefined) return
    execGet() }, [summonId, execGet]
  )
  const opinionString = `Zienswijze - ${ data?.title ?? "" }`

  return (
    <div>

      <MockWrapper>
        <WorkflowStatus status={opinionString} data={workflowOpinion(caseId)} />
        <WorkflowStatus status="Aanschrijving" data={workflowSummon(caseId)} />
        <WorkflowStatus status="Besluit" data={workflowDecision(caseId)} />
        <WorkflowStatus status="Visits" data={workflowVisit(caseId)} />
      </MockWrapper>
      { (shouldCreateVisit || shouldCreateAdditionalVisit) &&
        <WorkflowStatus status="Huisbezoek" data={workflowVisit(caseId)} />
      }
      { shouldCreateDebriefing &&
        <WorkflowStatus status="Debrief" data={workflowDebrief(caseId)} />
      }
      { shouldCloseCase &&
        <WorkflowStatus status="Zaak afsluiten" data={workflowCloseCase} showBWVMessage={true} />
      }
      { shouldCreateViolation &&
        <WorkflowStatus status="Overtreding" data={workflowViolation} showBWVMessage={true} />
      }
    </div>
  )
}

export default Workflow