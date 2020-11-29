import React from "react"
import { Button, Divider, Heading, Icon, themeColor } from "@datapunt/asc-ui"
import styled from "styled-components"

import { useCaseEvents } from "app/state/rest"
import workflow from "app/state/workflow/workflow"
import Table from "app/features/shared/components/molecules/Table/Table"
import { EditDocument } from "@datapunt/asc-assets"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const StyledTable = styled(Table)`
  color: red;
  line-height: 48px;
  thead {
    color: ${ themeColor("tint", "level4") }
  }
`

const columns = [
  { minWidth: 50 },
  { header: "Actuele taken", minWidth: 100 },
  { header: "Uitvoerder", minWidth: 100 },
  { header: "Einddatum", minWidth: 100 },
  { header: "Looptijd", minWidth: 100 },
  { header: "Actie", minWidth: 140 }
]

const workflowDebrief = (caseId: number) => [[
  <Icon size={ 20 }><EditDocument /></Icon>,
  "Verwerken Debrief",
  "ProjectHandhaver",
  "-",
  "-",
  <ButtonLink to={ to("/cases/:caseId/debriefing", { caseId })}>
    <Button variant="primary" as="span">Debrief verwerken</Button>
  </ButtonLink>
]]


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
      <Heading as="h2">Open taken</Heading>
      <Divider />
      { (shouldCreateVisit || shouldCreateAdditionalVisit) &&
        <ul>
          <li>Huisbezoek afleggen (door toezichthouders)</li>
        </ul>
      }
      { shouldCreateDebriefing &&
        <StyledTable
          columns={columns}
          data={ workflowDebrief(caseId) }
          noValuesPlaceholder=""
        />
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
