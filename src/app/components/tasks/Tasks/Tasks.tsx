import { useState } from "react"

import { useRoles, useTasks } from "app/state/rest"
import { Row, Column } from "app/components/layouts/Grid"
import TableTasks from "app/components/tasks/TableTasks/TableTasks"
import TasksFilter from "../TasksFilter/TasksFilter"
import useURLState from "app/hooks/useURLState/useURLState"

const Tasks: React.FC = () => {

  const [roles] = useRoles()
  const [roleParam, setRoleParam] = useURLState("role")
  const [role, setRole] = useState<MockComponents.Schemas.Role>(roleParam)
  const [tasks, { isBusy }] = useTasks(role)

  const updateRole = (value: MockComponents.Schemas.Role) => {
    setRoleParam(value)
    setRole(value)
  }

  return (
    <Row>
      <Column spanLarge={ 72 }>
        <TableTasks data={ tasks } isBusy={ isBusy } />
      </Column>
      <Column spanLarge={ 28 }>
        <TasksFilter role={ role } roles={ roles } setRole={ updateRole } />
      </Column>
    </Row>
  )
}
export default Tasks