import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCase, useScheduleTypes, useScheduleCreate } from "app/state/rest/"
import WorkflowForm from "app/components/case/Workflow/WorkflowForm"
import scaffold from "./scaffold"
import FormWithExtraLabel from "app/components/shared/FormWithExtraLabel/FormWithExtraLabel"

type Props = {
  id: Components.Schemas.Case["id"]
}

type ScheduleTypeFormData = Omit<Components.Schemas.ScheduleCreate, "week_segment" | "day_segment" | "priority"> & {
  week_segment: Components.Schemas.TeamScheduleTypes["week_segments"][0]
  day_segment: Components.Schemas.TeamScheduleTypes["day_segments"][0]
  priority: Components.Schemas.TeamScheduleTypes["priorities"][0]
}
const mapData = (data: ScheduleTypeFormData) => (
  {
    ...data,
    week_segment: data.week_segment.id,
    day_segment: data.day_segment.id,
    priority: data.priority.id
  }
)

const ScheduleForm: React.FC<Props> = ({ id }) => {

  const [caseItem] = useCase(id)
  const teamId = caseItem?.team.id
  const [scheduleTypes] = useScheduleTypes(teamId)
  const [, { execPost }] = useScheduleCreate()
  const postMethod = async (data: ScheduleTypeFormData) => await execPost(mapData(data))
  const initialValues = {
    case: id,
    action: scheduleTypes?.actions[0].id
  }

  return (
    <>
      <FormTitle>Gebruik dit formulier om een huisbezoek in te plannen</FormTitle>
      <FormWithExtraLabel>
        <WorkflowForm
          caseId={ id }
          data={ scheduleTypes }
          postMethod={ postMethod }
          scaffold={ scaffold }
          initialValues={ initialValues }
        />
      </FormWithExtraLabel>
    </>
  )
}

export default ScheduleForm