import { List } from "@amsterdam/wonen-ui"
import styled from "styled-components"
import to from "app/routing/utils/to"
import ChangeableDueDate from "app/components/case/tasks/ChangeDueDate/ChangebleDueDate"
import TaskButton from "app/components/case/tasks/TaskButton/TaskButton"
import taskActionMap from "./taskActionMap"
import LockIcon from "../components/LockIcon"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"

// This width value (113px) is the width of a date + edit icon including the spacing between them
const Span = styled.span`
  display: inline-block;
  min-width: 113px;
`

export default (
    id: Components.Schemas.Case["id"],
    execPost: (data: Partial<Components.Schemas.CamundaTaskComplete>) => Promise<unknown>
  ) =>
  (data: Components.Schemas.CamundaTask) => {

    const { task_name_id, camunda_task_id, name, roles, due_date, form, has_user_permission } = data
    const action = taskActionMap[task_name_id]
    const onSubmitTaskComplete = (variables: Components.Schemas.CamundaTask["form"] = {}) =>
      execPost({ case: id, camunda_task_id, variables })

    const disabled = !has_user_permission

    return ({
      itemList: [
        <LockIcon />,
        name,
        <List data={ roles } emptyPlaceholder="-" />,
        due_date ?
          <ChangeableDueDate dueDate={ due_date } caseId={ id } camundaTaskId={ camunda_task_id } /> :
          <Span>-</Span>,
        action !== undefined ?
          <TableAction
            title={ to(`/zaken/:id/${ action.target }/:camundaTaskId`, { id, camundaTaskId: camunda_task_id }) }
            disabled={ action.disabled ?? disabled }
          >{ action.name }</TableAction> :
          <TaskButton onSubmit={ onSubmitTaskComplete } taskName={ name } caseId={ id } form={ form } disabled={ disabled } />
      ]
    })
  }