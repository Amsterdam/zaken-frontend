import { useMemo } from "react"
import { Select } from "@amsterdam/design-system-react"
import { useAssignTaskWeek } from "@/api/hooks"
import { getSortedWeekNumbers } from "@/components/tasks/weekNumbers"
import styles from "./WeekNumber.module.css"

type Props = {
  canEdit: boolean
  taskId: Tasks.TaskId
  value: number | null
}

const NONE = ""

const WeekNumber: React.FC<Props> = ({ canEdit, taskId, value }) => {
  const weekOptions = useMemo(() => getSortedWeekNumbers(), [])
  const { mutate, isPending } = useAssignTaskWeek(taskId)
  const assignTaskWeek = mutate as (weekNumber: number | null) => void

  if (!canEdit) {
    return <span>{value ?? "-"}</span>
  }

  return (
    <Select
      className={styles.select}
      value={value === null ? NONE : String(value)}
      disabled={isPending}
      onChange={(event) => {
        const nextValue = event.currentTarget.value
        const nextWeek = nextValue === NONE ? null : Number(nextValue)
        if (nextWeek !== value) {
          assignTaskWeek(nextWeek)
        }
      }}
      aria-label={`Weeknummer voor taak ${taskId}`}
    >
      <Select.Option value={NONE}>-</Select.Option>
      {weekOptions.map((weekNumber) => (
        <Select.Option key={weekNumber} value={String(weekNumber)}>
          {weekNumber}
        </Select.Option>
      ))}
    </Select>
  )
}

export default WeekNumber


