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

const UpdateScheduleForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  schedule,
  scheduleTypes,
}) => (
  <div>
    <ScaffoldForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      initialValues={{ priority: schedule?.priority?.id }}
    >
      <ScaffoldFields
        {...createScaffoldProps(onCancel, schedule, scheduleTypes)}
      />
    </ScaffoldForm>
  </div>
)

export default UpdateScheduleForm
