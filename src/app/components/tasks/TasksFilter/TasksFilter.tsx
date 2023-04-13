import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffoldTheme from "./scaffoldTheme"
import scaffoldRole from "./scaffoldRole"
import scaffoldPageSize from "./scaffoldPageSize"
import scaffoldMyTasks from "./scaffoldMyTasks"
import scaffoldReasons from "./scaffoldReasons"
import MultipleOptionsFilter from "app/components/filters/MultipleOptionsFilter/MultipleOptionsFilter"
import MultipleOptionsFilterBox from "app/components/filters/MultipleOptionsFilterBox/MultipleOptionsFilterBox"

type Props = {
  theme: string
  themes?: Components.Schemas.CaseTheme[]
  setTheme: (value: string) => void
  role: MockComponents.Schemas.Role
  roles?: MockComponents.Schemas.Role[]
  setRole: (value: string) => void
  pageSize: string
  setPageSize: (value: string) => void
  owner: string
  setOwner: (value: string) => void
  taskNames?: Components.Schemas.CaseUserTaskTaskName[]
  selectedTaskNames: string[]
  setSelectedTaskNames: (value: Array<Components.Schemas.CaseUserTaskTaskName["name"]>) => void
  reasons?: Components.Schemas.CaseReason[]
  reason: string
  setReason: (value: string) => void
  districts: Components.Schemas.District[]
  districtNames: Array<Components.Schemas.District["name"]>
  setDistrictNames: (value: Array<Components.Schemas.District["name"]>) => void
  corporations?: Components.Schemas.HousingCorporation[]
  selectedCorporations: string[]
  setSelectedCorporations: (value: Array<Components.Schemas.HousingCorporation["name"]>) => void
}

const TasksFilter: React.FC<Props> = ({
  role, roles, setRole, theme, themes, setTheme, pageSize, setPageSize, owner,
  setOwner, taskNames, selectedTaskNames, setSelectedTaskNames, reasons, reason, setReason,
  districts, districtNames, setDistrictNames, corporations, selectedCorporations,
  setSelectedCorporations
}) => (
  <>
    <FilterMenu>
      <ScaffoldForm>
        <ScaffoldFields { ...scaffoldMyTasks(owner, setOwner) } />
      </ScaffoldForm>
      { themes === undefined
        ? <Spinner />
        : (
          <ScaffoldForm>
            <ScaffoldFields { ...scaffoldTheme(theme, themes, setTheme) } />
          </ScaffoldForm>
          )
      }
      { theme === "Onderhuur" && (
        <MultipleOptionsFilter
          label="Corporaties"
          options={ corporations }
          selectedOptions={ selectedCorporations }
          setSelectedOptions={ setSelectedCorporations }
          byId
        />
      )}
      { reasons === undefined
        ? <Spinner />
        : (
          <ScaffoldForm>
            <ScaffoldFields { ...scaffoldReasons(reason, setReason, reasons) } />
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
      { taskNames === undefined
        ? <Spinner />
        : (
          <MultipleOptionsFilterBox
            label="Taak namen"
            options={ taskNames }
            selectedOptions={ selectedTaskNames }
            setSelectedOptions={ setSelectedTaskNames }
        />
          )}
      <MultipleOptionsFilter
        label="Stadsdelen"
        options={ districts }
        selectedOptions={ districtNames }
        setSelectedOptions={ setDistrictNames }
      />
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
