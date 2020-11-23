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
          <li>Huisbezoek afleggen (door toezichthouders)</li>
        </ul>
      }
      { shouldCreateDebriefing &&
        <CreateDebriefingLink id={ caseId } />
      }
      { shouldCloseCase &&
        <>
        <ul>
          <li>Opstellen buitendienst rapport (door toezichthouder)</li>
          <li>Afsluiten zaak (door projectmedewerker)</li>
        </ul>
        <small>Het zaaksysteem geeft voor nu alleen een weergave van de taken. De uitvoering/verwerking vindt dus gewoon nog plaats in BWV.</small>
      </>
      }
      { shouldCreateViolation &&
        <>
          <ul>
            <li>Opstellen beeldverslag (door toezichthouder)</li>
            <li>Opstellen rapport van bevindingen (door toezichthouder)</li>
            <li>Opstellen aanschrijving (door projecthandhaver)</li>
          </ul>
          <small>Het zaaksysteem geeft voor nu alleen een weergave van de taken. De uitvoering/verwerking vindt dus gewoon nog plaats in BWV.</small>
        </>
      }
    </div>
  )
}

export default Workflow
