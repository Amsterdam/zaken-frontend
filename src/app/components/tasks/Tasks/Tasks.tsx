import { useState, useEffect } from "react"

import { Row, Column } from "app/components/layouts/Grid"
import TableTasks from "app/components/tasks/TableTasks/TableTasks"
import TasksFilter from "../TasksFilter/TasksFilter"
import { useRoles, useTasks } from "app/state/rest"

const Tasks: React.FC = () => {

  const [roles] = useRoles()
  const [role, setRole] = useState(roles?.[0])
  const [tasks, { isBusy, execGet }] = useTasks(role)

  useEffect(() => {
    (async () => await execGet())()
  }, [execGet])

  return (
    <Row>
      <Column spanLarge={ 75 }>
        <TableTasks data={ tasks } isBusy={ isBusy } />
      </Column>
      <Column spanLarge={ 25 }>
        <TasksFilter roles={ roles } setRole={ setRole } />
      </Column>
    </Row>
  )
}
export default Tasks