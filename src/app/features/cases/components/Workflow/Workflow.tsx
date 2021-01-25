import React, { useCallback, useEffect, useMemo } from "react"

import { useCaseTasks, useSummon, useTaskComplete } from "app/state/rest"
// import workflow from "app/state/workflow/workflow"
import WorkflowStatus from "./WorkflowStatus"
// import MockWrapper from "app/features/shared/components/molecules/MockWrapper/MockWrapper"
// import { workflowDebrief, workflowCloseCase, workflowDecision, workflowOpinion, workflowSummon, workflowViolation, workflowVisit } from "./WorkflowMocks"
import { Button, Icon } from "@amsterdam/asc-ui"
import Lock from "@material-ui/icons/Lock"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
import CompleteTaskForm from "app/features/tasks/components/CompleteTask/CompleteTaskForm"

type Props = {
  caseId: Components.Schemas.Case["id"]
  summonId?: number
}

type taskAction = {
  title: string
  target?: string
}

export const taskActionMap = {
  "task_create_visit": { title: "Resultaat huisbezoek", target: "visits" },
  "task_create_debrief": { title: "Debrief verwerken", target: "debriefing" }
} as Record<string, taskAction>

const Workflow: React.FC<Props> = ({ caseId, summonId }) => {
  //const dataCase = useCaseEvents(caseId).data
  const dataTasks = useCaseTasks(caseId).data
  const { execGet } = useSummon(summonId, { lazy: true })
  const { execPost } = useTaskComplete({ lazy: true })

  // const {
  //   shouldCreateVisit,
  //   shouldCreateDebriefing,
  //   shouldCloseCase,
  //   shouldCreateViolation,
  //   shouldCreateAdditionalVisit
  // } = workflow(dataCase)

  const mapTaskData = useCallback((data: Components.Schemas.CamundaTask) => {
  const action = taskActionMap[data.task_name_id] ?? {}
  
  const onSubmitTaskComplete = () => 
    execPost({ camunda_task_id: data.camunda_task_id, variables: {} })

  return ({
    itemList: [
      <Icon size={32}>{ <Lock /> }</Icon> ,
      data.name,
      "-",
      "-",
      action.target ? 
      <ButtonLink to={ to(`/cases/:id/${ action.target }`, { id: caseId })}>
        <Button variant="primary" as="span">{ action.title }</Button>
      </ButtonLink> :
      <CompleteTaskForm onSubmit={ onSubmitTaskComplete } />

    ]
  })
}, [ caseId, execPost ])

  // TODO-MOCKED, get summonId/summonTitle from useCaseEvents(caseId)
  useEffect(() => {
    if (summonId === undefined) return
    execGet() }, [summonId, execGet]
  )
  // const opinionString = `Zienswijze - ${ data?.title ?? "" }`
  const mappedTaskData = useMemo(() => dataTasks?.map(mapTaskData), [ mapTaskData, dataTasks ])

  return (
    <div>

      {/* <MockWrapper>
        <WorkflowStatus status={opinionString} data={workflowOpinion(caseId)} />
        <WorkflowStatus status="Aanschrijving" data={workflowSummon(caseId)} />
        <WorkflowStatus status="Besluit" data={workflowDecision(caseId)} />
      </MockWrapper> */}

      <WorkflowStatus status="_van Camunda_" data={mappedTaskData} />

      {/* { (shouldCreateVisit || shouldCreateAdditionalVisit) &&
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
      } */}
    </div>
  )
}

export default Workflow