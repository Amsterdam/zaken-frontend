import React from "react"
import { Button, Checkbox, Label } from "@datapunt/asc-ui"

import { useCaseEvents } from "app/state/rest"
import workflow from "app/state/workflow/workflow"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
import WorkflowStatus from "./WorkflowStatus"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const workflowDebrief = (caseId: Components.Schemas.Case["id"]) => [
  [ "Verwerken Debrief", "ProjectHandhaver", "-", "-",
    <ButtonLink to={ to("/cases/:caseId/debriefing", { caseId })}>
      <Button variant="primary" as="span">Debrief verwerken</Button>
    </ButtonLink>
  ]
]

const workflowVisit = [
  [ "Huisbezoek afleggen", "Toezichthouders", "-", "-",
    <Label htmlFor="cb_open" label="Open" disabled >
      <Checkbox id="cb_open" />
    </Label>
  ]
]

const workflowViolation = [
  [ "Opstellen beeldverslag", "Toezichthouder", "-", "-", "-" ],
  [ "Opstellen rapport van bevindingen", "Toezichthouder", "-", "-", "-" ],
  [ "Opstellen aanschrijving", "Projecthandhaver", "-", "-", "-" ]
]

const workflowCloseCase = [
  [ "Opstellen buitendienst rapport", "Toezichthouder", "-", "-", "-" ],
  [ "Afsluiten zaak", "Projectmederker", "-", "-", "-" ]
]

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
