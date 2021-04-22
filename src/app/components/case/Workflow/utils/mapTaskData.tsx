import { Button } from "@amsterdam/asc-ui"

import to from "app/routing/utils/to"
import ChangeableDueDate from "app/components/case/tasks/ChangeDueDate/ChangebleDueDate"
import CompleteTaskButton from "app/components/case/tasks/CompleteTask/CompleteTaskButton"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import CamundaFormButton from "app/components/case/tasks/CamundaTask/CamundaFormButton"
import taskActionMap from "./taskActionMap"
import LockIcon from "../components/LockIcon"
import List from "../components/List"

export default (id: Components.Schemas.Case["id"], execPost: (data: Partial<Components.Schemas.CamundaTaskComplete>) => Promise<unknown>) =>
  (data: Components.Schemas.CamundaTask) => {

    const { task_name_id, camunda_task_id, name, roles, due_date, form } = data
    const action = taskActionMap[task_name_id]
    const onSubmitTaskComplete = (variables: Components.Schemas.CamundaTask["form"] = {}) => execPost({ case: id, camunda_task_id, variables })

    return ({
      itemList: [
        <LockIcon />,
        name,
        roles ? <List items={ roles } /> : "-",
        due_date ?
          <ChangeableDueDate dueDate={ data.due_date } caseId={ id } camundaTaskId={ camunda_task_id } /> :
          "-",
        action !== undefined ?
          action.disabled ?
            <Button variant="primary" disabled={ true } title={ to(`/zaken/:id/${ action.target }`, { id }) }>{ action.name }</Button> :
            <ButtonLink to={ to(`/zaken/:id/${ action.target }`, { id }) }>
              <Button variant="primary" as="span">{ action.name }</Button>
            </ButtonLink>
        :
        form ?
          <CamundaFormButton onSubmit={ onSubmitTaskComplete } taskName={ name } caseId={ id } form={ form } /> :
          <CompleteTaskButton onSubmit={ onSubmitTaskComplete } taskName={ name } caseId={ id } />
      ]
    })
  }