import dayjs from "dayjs"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"
import { Schedule } from "../types"

type Props = {
  onSubmit: (data: any) => void
  onCancel: () => void
  schedule?: Schedule
  scheduleTypes?: Components.Schemas.ThemeScheduleTypes
};

const visitFromOptions: { id: number, name: string }[] = [
  {
    id: 1,
    name: "Vanaf vandaag",
  },
  {
    id: 2,
    name: "Vanaf een specifieke datum",
  },
]

const UpdateScheduleForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  schedule,
  scheduleTypes,
}) => {

  const initialValues = {
    week_segment: scheduleTypes?.week_segments.find((e) => e.id === schedule?.week_segment),
    day_segment: scheduleTypes?.day_segments.find((e) => e.id === schedule?.day_segment),
    visit_from: schedule?.visit_from_datetime ? visitFromOptions[1] : visitFromOptions[0],
    visit_from_datetime: schedule?.visit_from_datetime ? dayjs(schedule.visit_from_datetime).format("YYYY-MM-DD") : undefined,
    priority: scheduleTypes?.priorities.find((e) => e.id === schedule?.priority?.id),
  }

  return (
    <div>
      <ScaffoldForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        initialValues={initialValues}
      >
        <ScaffoldFields
          {...createScaffoldProps(onCancel, scheduleTypes, visitFromOptions)}
        />
      </ScaffoldForm>
    </div>
  )
}

export default UpdateScheduleForm
