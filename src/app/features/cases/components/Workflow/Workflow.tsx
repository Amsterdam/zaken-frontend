import React, { useEffect } from "react"
import { Button } from "@amsterdam/asc-ui"

import { useCaseEvents, useSummon } from "app/state/rest"
import workflow from "app/state/workflow/workflow"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
import WorkflowStatus from "./WorkflowStatus"
import MockWrapper from "app/features/shared/components/molecules/MockWrapper/MockWrapper"

type Props = {
  caseId: Components.Schemas.Case["id"]
  summonId?: number
}

const workflowDebrief = (caseId: Components.Schemas.Case["id"]) => (
  [
    { itemList:
      [ "Verwerken Debrief", "ProjectHandhaver", "-", "-",
      <ButtonLink to={ to("/cases/:id/debriefing", { id: caseId })}>
        <Button variant="primary" as="span">Debrief verwerken</Button>
      </ButtonLink>
      ]
    }
  ]
)

const workflowVisit = (
  [{ itemList: [ "Huisbezoek afleggen", "Toezichthouders", "-", "-", "-" ] }]
)

const workflowViolation = (
  [
    { itemList: [ "Opstellen beeldverslag", "Toezichthouder", "-", "-", "-" ] },
    { itemList: [ "Opstellen rapport van bevindingen", "Toezichthouder", "-", "-", "-" ] },
    { itemList: [ "Opstellen aanschrijving", "Projecthandhaver", "-", "-", "-" ] }
  ]
)

const workflowCloseCase = (
  [
    { itemList: [ "Opstellen buitendienst rapport", "Toezichthouder", "-", "-", "-" ] },
    { itemList: [ "Afsluiten zaak", "Projectmederker", "-", "-", "-" ] }
  ]
)

const workflowOpinion = (caseId: Components.Schemas.Case["id"]) => (
  [
    { itemList:
      [ "Beoordelen zienswijze", "ProjectHandhaver", "-", "-",
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
      [ "Verwerken aanschrijving", "ProjectHandhaver", "28-02-2021", "14 dagen",
        <ButtonLink to={ to("/cases/:id/summon", { id: caseId })}>
          <Button variant="primary" as="span">Aanschrijving</Button>
        </ButtonLink>
      ]
    }
  ]
)

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
        <WorkflowStatus status={opinionString} data={workflowSummon(caseId)} />
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
