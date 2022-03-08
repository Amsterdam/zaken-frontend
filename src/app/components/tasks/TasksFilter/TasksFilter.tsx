import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffoldTheme from "./scaffoldTheme"
import scaffoldRole from "./scaffoldRole"
import scaffoldPageSize from "./scaffoldPageSize"

type Props = {
  theme: string
  themes?: Components.Schemas.CaseTheme[]
  setTheme: (value: string) => void
  role: MockComponents.Schemas.Role
  roles?: MockComponents.Schemas.Role[]
  setRole: (value: string) => void
  pageSize: string
  setPageSize: (value: string) => void
}

const TasksFilter: React.FC<Props> = ({
  role, roles, setRole, theme, themes, setTheme, pageSize, setPageSize
}) => (
  <>
    <FilterMenu>
      { themes === undefined
          ? <Spinner />
          : (
            <ScaffoldForm>
              <ScaffoldFields { ...scaffoldTheme(theme, themes, setTheme) } />
            </ScaffoldForm>
          )
      }
      { roles === undefined
          ? <Spinner />
          : (
            <ScaffoldForm>
              <ScaffoldFields { ...scaffoldRole(role, roles, setRole) } />
            </ScaffoldForm>
          )
      }
      <ScaffoldForm>
        <ScaffoldFields { ...scaffoldPageSize(pageSize, setPageSize) } />
      </ScaffoldForm>
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


export default TasksFilter
