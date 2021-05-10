import { useState, useEffect } from "react"

import { Row, Column } from "app/components/layouts/Grid"
import TableTasks from "app/components/tasks/TableTasks/TableTasks"
import TasksFilter from "../TasksFilter/TasksFilter"
import { ROLE } from "../TasksFilter/scaffold"
import { useTasks } from "app/state/rest"

const Tasks: React.FC = () => {

  const [role, setRole] = useState(ROLE)
  const [tasks, { isBusy, execGet }] = useTasks(role)

  useEffect(() => {
    (async () => await execGet())()
  }, [execGet])

  return (
    <Row>
      <Column spanLarge={ 80 }>
        <TableTasks data={ tasks } isBusy={ isBusy } />
      </Column>
      <Column spanLarge={ 20 }>
        <TasksFilter role={ role } setRole={ setRole } />
      </Column>
    </Row>
  )
}
export default Tasks