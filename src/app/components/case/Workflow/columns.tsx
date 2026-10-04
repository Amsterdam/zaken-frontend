import { Button, StandaloneLink } from "@amsterdam/design-system-react"
import type { CompleteTaskPayload } from "@/api/hooks"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
import { type ColumnType } from "@/components/Table/types"
import ChangeableDueDate from "app/components/case/tasks/ChangeDueDate/ChangebleDueDate"
import TaskButton, {
  NO_PERMISSION,
} from "app/components/case/tasks/TaskButton/TaskButton"
import AssignTask from "app/components/tasks/TableTasks/AssignTask/AssignTask"
import UpdateSchedule from "./components/UpdateSchedule/UpdateSchedule"
import taskActionMap from "./utils/taskActionMap"

type Task = Tasks.WorkflowTask

export function getColumns(
  completeTask: (payload: CompleteTaskPayload) => Promise<unknown>,
  tasks: Task[] | undefined,
  themeId?: number,
): ColumnType<Task>[] {
  const hasCreateVisitTask = tasks?.some(
    (task) => task.task_name === "task_create_visit",
  )

  // Only when a visit is to be made: the urgency of that visit.
  const updateScheduleColumn: ColumnType<Task> = {
    header: "Urgentie",
    dataIndex: "task_name",
    render: (_, task) =>
      task.task_name === "task_create_visit" ? (
        <UpdateSchedule caseId={task.case} themeId={themeId} />
      ) : (
        "-"
      ),
  }

  return [
    { header: "Open taak", dataIndex: "name", minWidth: 240 },
    ...(hasCreateVisitTask ? [updateScheduleColumn] : []),
    {
      header: "Uitvoerder",
      dataIndex: "roles",
      render: (_, { roles }) => (roles?.length ? roles.join(", ") : "-"),
    },
    {
      header: "Toegewezen",
      dataIndex: "owner",
      render: (_, task) => (
        <AssignTask taskId={task.case_user_task_id} taskOwner={task.owner} />
      ),
    },
    {
      header: "Slotdatum",
      dataIndex: "due_date",
      noWrap: true,
      render: (_, task) =>
        task.due_date ? (
          <ChangeableDueDate
            dueDate={task.due_date}
            caseId={task.case}
            caseUserTaskId={String(task.case_user_task_id)}
          />
        ) : (
          "-"
        ),
    },
    {
      header: "Verwerking taak",
      dataIndex: "case",
      noWrap: true,
      render: (_, task) => {
        const {
          case: caseId,
          task_name,
          case_user_task_id,
          user_has_permission,
          name = "",
          form,
        } = task
        // Some tasks have a form of their own, on its own page.
        const action = taskActionMap[task_name]
        const disabled =
          task_name === "task_create_visit" || !user_has_permission

        if (action === undefined) {
          return (
            <TaskButton
              onSubmit={(variables = {}) =>
                completeTask({ case: caseId, case_user_task_id, variables })
              }
              taskName={name}
              caseId={caseId}
              form={form}
              disabled={disabled}
            />
          )
        }

        return (action.disabled ?? disabled) ? (
          <Button variant="secondary" disabled title={NO_PERMISSION}>
            {action.name}
          </Button>
        ) : (
          <StandaloneLink
            linkComponent={RouterLink}
            href={`/zaken/${caseId}/${action.target}/${case_user_task_id}`}
            aria-label={`${action.name}: ${name}`}
          >
            {action.name}
          </StandaloneLink>
        )
      },
    },
  ]
}

export default getColumns
