import { useRoles, useTasks, useCaseThemes } from "app/state/rest"
import { Row, Column } from "app/components/layouts/Grid"
import TableTasks from "app/components/tasks/TableTasks/TableTasks"
import TasksFilter from "../TasksFilter/TasksFilter"
import useURLState from "app/hooks/useURLState/useURLState"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"

const EMPTY_TEXT_NO_PERMISSION = "Helaas, u bent niet geautoriseerd om deze taken te bekijken."
const EMPTY_TEXT = "Er zijn momenteel geen open taken voor de gekozen filters."
const UNDERMINING = "Ondermijning"

const Tasks: React.FC = () => {
  const [hasPermission] = useHasPermission([SENSITIVE_CASE_PERMISSION])
  const [roles] = useRoles()
  const [caseThemes] = useCaseThemes()
  const [theme, setTheme] = useURLState("thema")
  const [role, setRole] = useURLState("rol")
  const [data, { isBusy }] = useTasks(hasPermission, theme, role)
  const tasks = data?.results || []

  /*
   ** Sensitive is sent as a filter in the useTasks hook/request.
   ** BE has to make some improvements because all tasks are returned, no matter what.
   ** If BE finished this issue, next line needs to be removed.
   */
  const sensitiveTasks = hasPermission ? tasks : tasks?.filter(e => e.case.sensitive === false)

  const emptyPlaceholder = hasPermission === false && theme === UNDERMINING ? EMPTY_TEXT_NO_PERMISSION : EMPTY_TEXT

  return (
    <Row>
      <Column spanLarge={ 72 }>
        <TableTasks
          data={ sensitiveTasks }
          isBusy={ isBusy }
          emptyPlaceholder={ emptyPlaceholder }
        />
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
