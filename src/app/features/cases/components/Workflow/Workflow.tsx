import React, { useEffect, useMemo } from "react"
import { Button, Icon } from "@amsterdam/asc-ui"

import { Lock } from "app/features/shared/components/atoms/Icons"

import { useCaseEvents, useCaseTasks, useSummon } from "app/state/rest"
import workflow from "app/state/workflow/workflow"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
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
  const dataTasks = useCaseTasks(caseId).data
  const { data, execGet } = useSummon(summonId, { lazy: true })
  const {
    shouldCreateVisit,
    shouldCreateDebriefing,
    shouldCloseCase,
    shouldCreateViolation,
    shouldCreateAdditionalVisit
  } = workflow(dataCase)

  const mapTaskData = (data: Components.Schemas.CamundaTask) => {
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
}

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
        <WorkflowStatus status="-Camunda-" data={mappedTaskData} />
      </MockWrapper>
      { (shouldCreateVisit || shouldCreateAdditionalVisit) &&
        <WorkflowStatus status="Huisbezoek" data={workflowVisit} />
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
