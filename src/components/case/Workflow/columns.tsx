import { Paragraph, StandaloneLink } from "@amsterdam/design-system-react"
import type { CompleteTaskPayload } from "@/api/hooks"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
import { StandaloneButton } from "@/components/StandaloneButton/StandaloneButton"
import { type ColumnType } from "@/components/Table/types"
import ChangeableDueDate from "@/components/case/tasks/ChangeDueDate/ChangebleDueDate"
import TaskButton, {
  NO_PERMISSION,
} from "@/components/case/tasks/TaskButton/TaskButton"
import AssignTask from "@/components/tasks/TableTasks/AssignTask/AssignTask"
import UpdateSchedule from "./components/UpdateSchedule/UpdateSchedule"
import taskActionMap from "./utils/taskActionMap"
import styles from "./Workflow.module.css"

/** A task with the state of the case it belongs to. */
type Task = Tasks.WorkflowTask & {
  state: string
  /** More about the state, e.g. who the summons is for. */
  information?: string
}

// Five columns, so the table fits on a laptop (1300px) without scrolling
// sideways: what would be a column of one word is a small line below another.
function getColumns(
  completeTask: (payload: CompleteTaskPayload) => Promise<unknown>,
  themeId?: number,
): ColumnType<Task>[] {
  return [
    {
      // The task is what the row is about: first, and it stands out. Below it
      // (small) who may do the task.
      header: "Open taak",
      dataIndex: "name",
      render: (_, { name, roles }) => (
        <>
          <Paragraph>
            <strong>{name}</strong>
          </Paragraph>
          {roles && roles.length > 0 && (
            <Paragraph size="small">{roles.join(", ")}</Paragraph>
          )}
        </>
      ),
    },
    {
      // The state of the case the task belongs to, and (small) more about it,
      // e.g. who the summons is for.
      header: "Status",
      dataIndex: "state",
      render: (_, { state, information, task_name, case: caseId }) => (
        <>
          <Paragraph>{state}</Paragraph>
          {information && <Paragraph size="small">{information}</Paragraph>}
          {/* Only when a visit is to be made: the urgency of that visit. */}
          {task_name === "task_create_visit" && (
            <div className={styles.urgency}>
              Urgentie: <UpdateSchedule caseId={caseId} themeId={themeId} />
            </div>
          )}
        </>
      ),
    },
    {
      header: "Toegewezen",
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
