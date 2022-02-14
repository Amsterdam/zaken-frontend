import { FormTitle } from "@amsterdam/asc-ui"

import { useCase, useScheduleTypes, useScheduleCreate } from "app/state/rest/"
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm"
import scaffold from "./scaffold"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  id: Components.Schemas.Case["id"]
  caseUserTaskId: Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"]
}

type ScheduleTypeFormData = Omit<Components.Schemas.ScheduleCreate, "week_segment" | "day_segment" | "priority"> & {
  week_segment: Components.Schemas.ThemeScheduleTypes["week_segments"][0]
  day_segment: Components.Schemas.ThemeScheduleTypes["day_segments"][0]
  priority: Components.Schemas.ThemeScheduleTypes["priorities"][0]
}
const mapData = (data: ScheduleTypeFormData) => (
  {
    ...data,
    week_segment: data.week_segment.id,
    day_segment: data.day_segment.id,
    priority: data.priority.id
  }
)

const ScheduleForm: React.FC<Props> = ({ id, caseUserTaskId }) => {

  const [caseItem] = useCase(id)
  const themeId = caseItem?.theme.id
  const [scheduleTypes] = useScheduleTypes(themeId)
  const fields = useScaffoldedFields(scaffold, id, scheduleTypes)
  const [, { execPost }] = useScheduleCreate()

  const initialValues = {
    action: scheduleTypes?.actions[0].id
  }

  return (
    <>
      <FormTitle>Gebruik dit formulier om een bezoek in te plannen</FormTitle>
      <WorkflowForm
        id={ id }
        fields={ fields }
        mapData={ mapData }
        postMethod={ execPost }
        initialValues={ initialValues }
        caseUserTaskId={ caseUserTaskId }
      />
    </>
  )
}

export default ScheduleForm