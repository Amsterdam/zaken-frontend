import React from "react"
import { Divider, Heading } from "@datapunt/asc-ui"

import CreateDebriefingLink from "app/features/cases/components/organisms/CreateDebriefingLink/CreateDebriefingLink"
import { useCaseEvents } from "app/state/rest"
import workflow from "app/state/workflow/workflow"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const Workflow: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseEvents(caseId)
  const {
    shouldCreateVisit,
    shouldCreateDebriefing,
    shouldCloseCase,
    shouldCreateViolation
  } = workflow(data)

  return (
    <div>
      <Heading as="h2">Open taken</Heading>
      <Divider />
      { shouldCreateVisit &&
        <ul>
          <li>Huisbezoek</li>
        </ul>
      }
      { shouldCreateDebriefing &&
        <CreateDebriefingLink id={ caseId } />
      }
      { shouldCloseCase &&
        <>
        <ul>
          <li>Opstellen buitendienst rapport</li>
          <li>Afsluiten zaak</li>
        </ul>
        <small>(Uit te voeren in BWV)</small>
      </>
      }
      { shouldCreateViolation &&
        <>
          <ul>
            <li>Opstellen beeldverslag (optioneel)</li>
            <li>Opstellen rapport van bevindingen</li>
            <li>Opstellen aanschrijving</li>
          </ul>
          <small>(Uit te voeren in BWV)</small>
        </>
      }
    </div>
  )
}

export default Workflow
