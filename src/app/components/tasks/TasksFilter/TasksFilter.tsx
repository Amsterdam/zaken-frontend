import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffoldTheme from "./scaffoldTheme"
import scaffoldRole from "./scaffoldRole"
import getApiUrlTasks from "../utils/getApiUrlTasks"
import useContextCache from "app/state/rest/provider/useContextCache"

type Props = {
  theme: string
  themes?: Components.Schemas.CaseTheme[]
  setTheme: (value: string) => void
  role: MockComponents.Schemas.Role
  roles?: MockComponents.Schemas.Role[]
  setRole: (value: string) => void
}

const TasksFilter: React.FC<Props> = ({ role, roles, setRole, theme, themes, setTheme }) => {
  const apiUrl = getApiUrlTasks()
  const { clearContextCache } = useContextCache("cases", apiUrl)

  const onChangeTheme = (value: string) => {
    // Clear the Context/cache to prevent showing outdated data.
    clearContextCache()
    setTheme(value)
  }

  const onChangeRole = (value: string) => {
    // Clear the Context/cache to prevent showing outdated data.
    clearContextCache()
    setRole(value)
  }

  return (
    <>
      <FilterMenu>
        { themes === undefined
            ? <Spinner />
            : (
              <ScaffoldForm>
                <ScaffoldFields { ...scaffoldTheme(theme, themes, onChangeTheme) } />
              </ScaffoldForm>
            )
        }
        { roles === undefined
            ? <Spinner />
            : (
              <ScaffoldForm>
                <ScaffoldFields { ...scaffoldRole(role, roles, onChangeRole) } />
              </ScaffoldForm>
            )
        }
      </FilterMenu>
      <FilterMenu>
        <i>
          <a href={ `${ window.location.pathname }${ window.location.search }` }>
            Herlaad taken
          </a>
        </i>
      </FilterMenu>
    </>
  )
}
export default TasksFilter
