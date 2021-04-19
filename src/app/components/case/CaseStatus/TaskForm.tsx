import { FC } from "react"
import styled from "styled-components"

import AddTaskForm from "app/components/case/tasks/AddTask/AddTaskForm"

type Props = {
  id: Components.Schemas.Case["id"]
}

const Div = styled.div`
  display: flex;
`

const TaskForm: FC<Props> = ({ id }) => (
  <Div>
    <AddTaskForm caseId={ id } />
  </Div>
)

export default TaskForm
