import to from "app/routing/utils/to"
import ChangeableDueDate from "app/components/case/tasks/ChangeDueDate/ChangebleDueDate"
import CompleteTaskButton from "app/components/case/tasks/CompleteTask/CompleteTaskButton"
import CamundaFormButton from "app/components/case/tasks/CamundaTask/CamundaFormButton"
import taskActionMap from "./taskActionMap"
import LockIcon from "../components/LockIcon"
import List from "../components/List"
import TableButton from "app/components/shared/Table/components/TableAction/TableAction"

export default (
    id: Components.Schemas.Case["id"],
    execPost: (data: Partial<Components.Schemas.CamundaTaskComplete>) => Promise<unknown>
  ) =>
  (data: Components.Schemas.CamundaTask) => {

    const { task_name_id, camunda_task_id, name, roles, due_date, form } = data
    const action = taskActionMap[task_name_id]
    const onSubmitTaskComplete = (variables: Components.Schemas.CamundaTask["form"] = {}) =>
      execPost({ case: id, camunda_task_id, variables })

    return ({
      itemList: [
        <LockIcon />,
        name,
        roles ? <List items={ roles } /> : "-",
        due_date ?
          <ChangeableDueDate dueDate={ due_date } caseId={ id } camundaTaskId={ camunda_task_id } /> :
          "-",
        action !== undefined ?
          action.disabled ?
            <TableButton
              title={ to(`/zaken/:id/${ action.target }/:camundaTaskId`, { id, camundaTaskId: camunda_task_id }) }
              disabled={ true }
            >{ action.name }</TableButton> :
            <TableButton
              to={ to(`/zaken/:id/${ action.target }/:camundaTaskId`, { id, camundaTaskId: camunda_task_id }) }
            >{ action.name }</TableButton>
        :
        form ?
          <CamundaFormButton onSubmit={ onSubmitTaskComplete } taskName={ name } caseId={ id } form={ form } /> :
          <CompleteTaskButton onSubmit={ onSubmitTaskComplete } taskName={ name } caseId={ id } />
      ]
    })
  }