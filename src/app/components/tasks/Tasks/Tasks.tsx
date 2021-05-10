import { useEffect } from "react"

import { Row, Column } from "app/components/layouts/Grid"
import TableTasks from "app/components/tasks/TableTasks/TableTasks"
import { useTasks } from "app/state/rest"

const Tasks: React.FC = () => {

  const [tasks, { isBusy, execGet }] = useTasks("Projectmedewerker")

  useEffect(() => {
    (async () => await execGet())()
  }, [execGet])

  return (
    <Row>
      <Column spanLarge={ 80 }>
        <TableTasks data={ tasks } isBusy={ isBusy } />
      </Column>
      <Column spanLarge={ 20 }>
      </Column>
    </Row>
  )
}
export default Tasks