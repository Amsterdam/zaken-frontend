import { Icon, Paragraph, StandaloneLink } from "@amsterdam/design-system-react"
import { PersonIcon } from "@amsterdam/design-system-react-icons"
import type { CompleteTaskPayload } from "@/api/hooks"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
import { StandaloneButton } from "@/components/StandaloneButton/StandaloneButton"
import { type ColumnType } from "@/components/Table/types"
import ChangeableDueDate from "app/components/case/tasks/ChangeDueDate/ChangebleDueDate"
import TaskButton, {
  NO_PERMISSION,
} from "app/components/case/tasks/TaskButton/TaskButton"
import AssignTask from "app/components/tasks/TableTasks/AssignTask/AssignTask"
import UpdateSchedule from "./components/UpdateSchedule/UpdateSchedule"
import taskActionMap from "./utils/taskActionMap"

/** A task with the state of the case it belongs to. */
export type Task = Tasks.WorkflowTask & {
  state: string
  /** More about the state, e.g. who the summons is for. */
  information?: string
}

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
    {
      // The state of the case, the task, and below them (small) who may do
      // it and more about the state: all in one cell, so the table has few
      // columns and fits in its card on a laptop.
      header: "Open taak",
      dataIndex: "name",
      render: (_, { state, name, roles, information }) => {
        const details = [roles?.join(", "), information].filter(Boolean)
        return (
          <>
            <strong>{state}</strong>
            <Paragraph>{name}</Paragraph>
            {details.length > 0 && (
              <Paragraph size="small">{details.join(" · ")}</Paragraph>
            )}
          </>
        )
      },
    },
    ...(hasCreateVisitTask ? [updateScheduleColumn] : []),
    {
      // An icon as the header, so the column needs no more room than the avatar; the
      // name is there for a screen reader and as a tooltip.
      header: (
        <span
          title="Toewijzen"
          // As wide as the avatar below it, with the icon in the middle.
          style={{
            display: "inline-flex",
            justifyContent: "center",
            width: "2rem",
          }}
        >
          <Icon svg={PersonIcon} />
          <span className="ams-visually-hidden">Toewijzen</span>
        </span>
      ),
      dataIndex: "owner",
      hideOnMobile: true,
      render: (_, task) => (
        <AssignTask taskId={task.case_user_task_id} taskOwner={task.owner} />
      ),
    },
    {
      header: "Slotdatum",
      dataIndex: "due_date",
      hideOnMobile: true,
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
          <StandaloneButton disabled title={NO_PERMISSION}>
            {action.name}
          </StandaloneButton>
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
