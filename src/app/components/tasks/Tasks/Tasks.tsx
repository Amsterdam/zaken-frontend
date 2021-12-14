import { useRoles, useTasks, useCaseThemes } from "app/state/rest"
import { Row, Column } from "app/components/layouts/Grid"
import TableTasks from "app/components/tasks/TableTasks/TableTasks"
import TasksFilter from "../TasksFilter/TasksFilter"
import useURLState from "app/hooks/useURLState/useURLState"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"

const Tasks: React.FC = () => {
  const [roles] = useRoles()
  const [caseThemes] = useCaseThemes()
  const [theme, setTheme] = useURLState("thema")
  const [role, setRole] = useURLState("rol")
  const [tasks, { isBusy }] = useTasks(theme, role)
  const [hasPermission] = useHasPermission(SENSITIVE_CASE_PERMISSION)

  // Filter tasks with cases for sensitive. TODO: implement filter in BE
  const sensitiveTasks = hasPermission ? tasks : tasks?.filter(e => e.case.sensitive === false)

  return (
    <Row>
      <Column spanLarge={ 72 }>
        <TableTasks data={ sensitiveTasks } isBusy={ isBusy } />
      </Column>
      <Column spanLarge={ 28 }>
        <TasksFilter
          role={ role }
          roles={ roles }
          setRole={ setRole }
          theme={ theme }
          themes={ caseThemes?.results }
          setTheme={ setTheme }
        />
      </Column>
    </Row>
  )
}

export default Tasks
