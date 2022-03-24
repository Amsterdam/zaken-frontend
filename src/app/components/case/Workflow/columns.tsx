import { List } from '@amsterdam/wonen-ui';
import styled from 'styled-components';
import to from 'app/routing/utils/to';
import ChangeableDueDate from 'app/components/case/tasks/ChangeDueDate/ChangebleDueDate';
import TaskButton from 'app/components/case/tasks/TaskButton/TaskButton';
import TableAction from 'app/components/shared/TableAction/TableAction';
import taskActionMap from './utils/taskActionMap';
import LockIcon from './components/LockIcon';
import UserInitials from './components/UserInitials';

// This width value (113px) is the width of a date + edit icon including the spacing between them
const Span = styled.span`
  display: inline-block;
  min-width: 113px;
`;

export default (execPost: (payload?: any) => Promise<unknown>) => (
  [
    {
      minWidth: 50,
      render: () => <LockIcon />,
    }, {
      header: 'Actuele taken',
      dataIndex: 'name',
      minWidth: 300,
    }, {
      header: 'Uitvoerder',
      dataIndex: 'roles',
      minWidth: 200,
      render: (roles: any) => <List data={roles} emptyPlaceholder="-" />,
    }, {
      header: 'Opgepakt door',
      dataIndex: 'owner',
      render: (owner: any) => <UserInitials owner={owner} />,
    }, {
      header: 'Slotdatum',
      dataIndex: 'due_date',
      minWidth: 120,
      render: (due_date: any, record: any) => (due_date ? (
        <ChangeableDueDate dueDate={due_date} caseId={record.case} caseUserTaskId={record.case_user_task_id} />
      ) : <Span>-</Span>),
    }, {
      header: 'Verwerking taak',
      dataIndex: 'case',
      minWidth: 280,
      render: (id: any, record: any) => {
        const {
          task_name, case_user_task_id, user_has_permission, name, form,
        } = record;
        const action = taskActionMap[task_name];
        const onSubmitTaskComplete = (variables: Components.Schemas.CaseUserTaskWorkdflow['form_variables'] = {}) => (
          execPost({ case: id, case_user_task_id, variables })
        );
        const disabled = task_name === 'task_create_visit' || !user_has_permission;
        return (
          action !== undefined ? (
            <TableAction
              title={to(`/zaken/:id/${action.target}/:caseUserTaskId`, { id, caseUserTaskId: case_user_task_id })}
              to={to(`/zaken/:id/${action.target}/:caseUserTaskId`, { id, caseUserTaskId: case_user_task_id })}
              disabled={action.disabled ?? disabled}
            >
              { action.name }
            </TableAction>
          ) : (
            <TaskButton
              onSubmit={onSubmitTaskComplete}
              taskName={name}
              caseId={id}
              form={form}
              disabled={disabled}
            />
          )
        );
      },
    },
  ]
);
