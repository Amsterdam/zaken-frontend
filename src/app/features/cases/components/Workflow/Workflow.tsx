import React, { useCallback, useEffect, useMemo } from "react"

import { useCaseEvents, useCaseTasks, useSummon } from "app/state/rest"
import workflow from "app/state/workflow/workflow"
import WorkflowStatus from "./WorkflowStatus"
import MockWrapper from "app/features/shared/components/molecules/MockWrapper/MockWrapper"
import { workflowDebrief, workflowCloseCase, workflowDecision, workflowOpinion, workflowSummon, workflowViolation, workflowVisit } from "./WorkflowMocks"
import { Button, Icon } from "@amsterdam/asc-ui"
import Lock from "@material-ui/icons/Lock"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"

type Props = {
  caseId: Components.Schemas.Case["id"]
  summonId?: number
}

type taskAction = {
  title: string
  target: string
}

export const taskActionMap = {
  "task_create_visit": { title: "Huisbezoek aanmaken", target: "visits" },
  "task_create_debrief": { title: "Debrief verwerken", target: "debriefing" }
} as Record<string, taskAction>

const Workflow: React.FC<Props> = ({ caseId, summonId }) => {
  const dataCase = useCaseEvents(caseId).data
  const dataTasks = useCaseTasks(caseId).data
  const { data, execGet } = useSummon(summonId, { lazy: true })
  const {
    shouldCreateVisit,
    shouldCreateDebriefing,
    shouldCloseCase,
    shouldCreateViolation,
    shouldCreateAdditionalVisit
  } = workflow(dataCase)

  const mapTaskData = useCallback((data: Components.Schemas.CamundaTask) => {
    const action = taskActionMap[data.task_name_id]
  return ({
    itemList: [
      <Icon size={32}>{ <Lock /> }</Icon> ,
      data.name,
      "-uitvoerder-",
      "-datum-",
      <ButtonLink to={ to(`/cases/:id/${ action.target }`, { id: caseId })}>
        <Button variant="primary" as="span">{ action.title }</Button>
      </ButtonLink>
    ]
  })
}, [ caseId ])

  // TODO-MOCKED, get summonId/summonTitle from useCaseEvents(caseId)
  useEffect(() => {
    if (summonId === undefined) return
    execGet() }, [summonId, execGet]
  )
  const opinionString = `Zienswijze - ${ data?.title ?? "" }`
  const mappedTaskData = useMemo(() => dataTasks?.map(mapTaskData), [ mapTaskData, dataTasks ])

  return (
    <div>

      <MockWrapper>
        <WorkflowStatus status={opinionString} data={workflowOpinion(caseId)} />
        <WorkflowStatus status="Aanschrijving" data={workflowSummon(caseId)} />
        <WorkflowStatus status="Besluit" data={workflowDecision(caseId)} />
        <WorkflowStatus status="Visits" data={workflowVisit(caseId)} />
        <WorkflowStatus status="-Camunda-" data={mappedTaskData} />

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