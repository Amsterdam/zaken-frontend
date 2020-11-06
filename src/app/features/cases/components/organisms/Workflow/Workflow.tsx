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
    shouldCloseCase
  } = workflow(data)

  return (
    <div>
      <Heading as="h2">Open taken</Heading>
      <Divider />
      { shouldCreateVisit &&
        <p>Huisbezoek</p>
      }
      { shouldCreateDebriefing &&
        <CreateDebriefingLink id={ caseId } />
      }
      { shouldCloseCase &&
        <p>Zaak afsluiten</p>
      }
    </div>
  )
}

export default Workflow
