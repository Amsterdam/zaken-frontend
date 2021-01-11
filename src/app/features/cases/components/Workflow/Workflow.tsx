import React from "react"
import { Button } from "@amsterdam/asc-ui"

import { useCaseEvents } from "app/state/rest"
import workflow from "app/state/workflow/workflow"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
import WorkflowStatus from "./WorkflowStatus"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const workflowDebrief = (caseId: Components.Schemas.Case["id"]) => (
  [ 
    { itemList: 
      [ "Verwerken Debrief", "ProjectHandhaver", "-", "-",
      <>
        <ButtonLink to={ to("/cases/:id/debriefing", { id: caseId })}>
          <Button variant="primary" as="span">Debrief verwerken</Button>
        </ButtonLink>
        <ButtonLink to={ to("/cases/:id/view", { id: caseId })}>
          <Button variant="primary" as="span">Uitkomst zienswijze</Button>
        </ButtonLink>
      </>
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

const Workflow: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseEvents(caseId)
  const {
    shouldCreateVisit,
    shouldCreateDebriefing,
    shouldCloseCase,
    shouldCreateViolation,
    shouldCreateAdditionalVisit
  } = workflow(data)

  return (
    <div>
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
