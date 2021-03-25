import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCase, useScheduleTypes, useSchedules } from "app/state/rest/"
import WorkflowForm from "app/components/cases/Workflow/WorkflowForm"
import scaffold from "./scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"

type Props = {
  id: Components.Schemas.Case["id"]
}

const ScheduleForm: React.FC<Props> = ({ id }) => {

  const [caseItem] = useCase(id)
  const teamId = caseItem?.team.id
  const [scheduleTypes] = useScheduleTypes(teamId)
  const [, { execPost }] = useSchedules()
  const initialValues = {
    case: id,
    action: scheduleTypes?.actions[0],
    week_segment: scheduleTypes?.week_segments[0],
    day_segment: scheduleTypes?.day_segments[0],
    priority: scheduleTypes?.priorities[0]
  }

  return (
    <>
      <FormTitle>Gebruik dit formulier om een huisbezoek in te plannen</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          caseId={ id }
          data={ scheduleTypes }
          postMethod={ execPost }
          scaffold={ scaffold }
          initialValues={ initialValues }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default ScheduleForm