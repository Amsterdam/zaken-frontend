import React, { useCallback, useEffect, useMemo } from "react"
import { Button } from "@amsterdam/asc-ui"

import { useCaseEvents, useCaseTasks, useSummon, useTaskComplete } from "app/state/rest"
import workflow from "app/state/workflow/workflow"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
import WorkflowStatus from "./WorkflowStatus"
import MockWrapper from "app/features/shared/components/molecules/MockWrapper/MockWrapper"
import CompleteTaskForm from "app/features/tasks/components/CompleteTask/CompleteTaskForm"

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

const workflowDebrief = (caseId: Components.Schemas.Case["id"]) => (
  [
    { itemList:
      [ "Verwerken Debrief", "ProjectHandhaver", "-",
      <ButtonLink to={ to("/cases/:id/debriefing", { id: caseId })}>
        <Button variant="primary" as="span">Debrief verwerken</Button>
      </ButtonLink>
      ]
    }
  ]
)

const workflowVisit = (
  [{ itemList: [ "Huisbezoek afleggen", "Toezichthouders", "-", "-" ] }]
)

const workflowViolation = (
  [
    { itemList: [ "Opstellen beeldverslag", "Toezichthouder", "-", "-" ] },
    { itemList: [ "Opstellen rapport van bevindingen", "Toezichthouder", "-", "-" ] },
    { itemList: [ "Opstellen aanschrijving", "Projecthandhaver", "-", "-" ] }
  ]
)

const workflowCloseCase = (
  [
    { itemList: [ "Opstellen buitendienst rapport", "Toezichthouder", "-", "-" ] },
    { itemList: [ "Afsluiten zaak", "Projectmederker", "-", "-" ] }
  ]
)

const workflowOpinion = (caseId: Components.Schemas.Case["id"]) => (
  [
    { itemList:
      [ "Beoordelen zienswijze", "ProjectHandhaver", "-",
        <ButtonLink to={ to("/cases/:id/opinion", { id: caseId })}>
          <Button variant="primary" as="span">Uitkomst zienswijze</Button>
        </ButtonLink>
      ]
    }
  ]
)

const workflowSummon = (caseId: Components.Schemas.Case["id"]) => (
  [
    { itemList:
      [ "Verwerken aanschrijving", "ProjectHandhaver", "28-02-2021",
        <ButtonLink to={ to("/cases/:id/summon", { id: caseId })}>
          <Button variant="primary" as="span">Aanschrijving</Button>
        </ButtonLink>
      ]
    }
  ]
)

const workflowDecision = (caseId: Components.Schemas.Case["id"]) => (
  [
    { itemList:
      [ "Verwerken besluit", "ProjectHandhaver", "28-02-2021",
        <ButtonLink to={ to("/cases/:id/decision", { id: caseId })}>
          <Button variant="primary" as="span">Besluit</Button>
        </ButtonLink>
      ]
    }
  ]
)

const Workflow: React.FC<Props> = ({ caseId, summonId }) => {
  const dataCase = useCaseEvents(caseId).data
  const dataTasks = useCaseTasks(caseId).data

  const { data, execGet } = useSummon(summonId, { lazy: true })
  const { execPost } = useTaskComplete({ lazy: true })

  const {
    shouldCreateVisit,
    shouldCreateDebriefing,
    shouldCloseCase,
    shouldCreateViolation,
    shouldCreateAdditionalVisit
  } = workflow(dataCase)

  const mapTaskData = useCallback((data: Components.Schemas.CamundaTask) => {
    const action = taskActionMap[data.task_name_id] ?? {}
    const onSubmitTaskComplete = () => 
      execPost({ camunda_task_id: data.camunda_task_id, variables: {} })

  return ({
    itemList: [
      data.name,
      "-uitvoerder-",
      "-datum-",
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
  const opinionString = `Zienswijze - ${ data?.title ?? "" }`
  const mappedTaskData = useMemo(() => dataTasks?.map(mapTaskData), [ mapTaskData, dataTasks ])


  return (
    <div>
      <WorkflowStatus status="_van Camunda_" data={mappedTaskData} />

      <MockWrapper>
        <WorkflowStatus status={opinionString} data={workflowOpinion(caseId)} />
        <WorkflowStatus status="Aanschrijving" data={workflowSummon(caseId)} />
        <WorkflowStatus status="Besluit" data={workflowDecision(caseId)} />
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
