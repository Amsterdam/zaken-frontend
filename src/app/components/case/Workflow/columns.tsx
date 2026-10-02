import { List } from "@amsterdam/wonen-ui";
import ChangeableDueDate from "app/components/case/tasks/ChangeDueDate/ChangebleDueDate";
import TaskButton from "app/components/case/tasks/TaskButton/TaskButton";
import taskActionMap from "./utils/taskActionMap";
import CustomIcon from "app/components/shared/CustomIcon/CustomIcon";
import LinkButton from "app/components/shared/LinkButton/LinkButton";
import UpdateSchedule from "./components/UpdateSchedule/UpdateSchedule";
import AssignTask from "app/components/tasks/TableTasks/AssignTask/AssignTask";
import { useSetWorkflowTaskOwner, type CompleteTaskPayload } from "@/api/hooks";

/**
 * Kleine wrapper zodat de hook per rij aangeroepen kan worden.
 * Hooks mogen niet conditioneel of in callbacks aangeroepen worden,
 * dus we pakken dit op via een component.
 */
const AssignTaskWorkflow: React.FC<{
  task: Tasks.WorkflowTask;
}> = ({ task }) => {
  const { case_user_task_id: taskId, owner: taskOwner, case: caseId } = task;
  const onOwnerChange = useSetWorkflowTaskOwner(caseId);

  return (
    <AssignTask
      taskId={taskId}
      taskOwner={taskOwner}
      isEnforcement={false}
      onOwnerChange={onOwnerChange}
    />
  );
};

export function getColumns(
  completeTask: (payload: CompleteTaskPayload) => Promise<unknown>,
  tasks: Tasks.WorkflowTask[] | undefined,
  themeId?: number,
) {
  const hasCreateVisitTask = tasks?.some(
    (task) => task.task_name === "task_create_visit",
  );

  const updateScheduleColumn = {
    header: "Urgentie",
    dataIndex: "task_name",
    render: (_: any, record: any) =>
      record.task_name === "task_create_visit" ? (
        <UpdateSchedule caseId={record.case} themeId={themeId} />
      ) : (
        <span style={{ display: "inline-block", minWidth: 113 }}> - </span>
      ),
  };

  return [
    {
      minWidth: 50,
      render: () => <CustomIcon name="LockOpen" size={28} />,
    },
    {
      header: "Open taken",
      dataIndex: "name",
      minWidth: 300,
    },
    ...(hasCreateVisitTask ? [updateScheduleColumn] : []),
    {
      header: "Uitvoerder",
      dataIndex: "roles",
      minWidth: 200,
      render: (roles: any) => <List data={roles} emptyPlaceholder="-" />,
    },
    {
      header: "Toegewezen",
      dataIndex: "owner",
      render: (_: any, task: any) => <AssignTaskWorkflow task={task} />,
    },
    {
      header: "Slotdatum",
      dataIndex: "due_date",
      minWidth: 120,
      render: (due_date: any, record: any) =>
        due_date ? (
          <ChangeableDueDate
            dueDate={due_date}
            caseId={record.case}
            caseUserTaskId={record.case_user_task_id}
          />
        ) : (
          <span style={{ display: "inline-block", minWidth: 113 }}> - </span>
        ),
    },
    {
      header: "Verwerking taak",
      dataIndex: "case",
      minWidth: 280,
      render: (id: any, record: any) => {
        const {
          task_name,
          case_user_task_id,
          user_has_permission,
          name,
          form,
        } = record;

        const action = taskActionMap[task_name];

        const onSubmitTaskComplete = (
          variables: Tasks.WorkflowTask["form_variables"] | null = {},
        ) => completeTask({ case: id, case_user_task_id, variables });

        const disabled =
          task_name === "task_create_visit" || !user_has_permission;

        return action !== undefined ? (
          <LinkButton
            text={action.name}
            path={`/zaken/${id}/${action.target}/${case_user_task_id}`}
            disabled={action.disabled ?? disabled}
          />
        ) : (
          <TaskButton
            onSubmit={onSubmitTaskComplete}
            taskName={name}
            caseId={id}
            form={form}
            disabled={disabled}
          />
        );
      },
    },
  ];
}

export default getColumns;
