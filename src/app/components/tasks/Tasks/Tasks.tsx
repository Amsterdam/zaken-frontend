import { useState, useEffect } from "react"

import { Row, Column } from "app/components/layouts/Grid"
import TableTasks from "app/components/tasks/TableTasks/TableTasks"
import TasksFilter from "../TasksFilter/TasksFilter"
import { useRoles, useTasks } from "app/state/rest"

const Tasks: React.FC = () => {

  const [roles] = useRoles()
  const [role, setRole] = useState<MockComponents.Schemas.Role>()
  const [tasks, { isBusy }] = useTasks(role)

  useEffect(() => {
    if (role !== undefined) return
    if (roles === undefined) return
    setRole(roles[0])
  }, [role, roles, setRole])

  return (
    <Row>
      <Column spanLarge={ 72 }>
        <TableTasks data={ tasks } isBusy={ isBusy } />
      </Column>
      <Column spanLarge={ 28 }>
        <TasksFilter roles={ roles } setRole={ setRole } />
      </Column>
    </Row>
  )
}
export default Tasks