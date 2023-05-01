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
  districts: Components.Schemas.District[]
  districtNames: Components.Schemas.District["name"][]
  corporations?: Components.Schemas.HousingCorporation[]
  pageSize: string
  owner: string
  reasons?: Components.Schemas.CaseReason[]
  reason: string
  role: MockComponents.Schemas.Role
  roles?: MockComponents.Schemas.Role[]
  selectedCorporations: string[]
  selectedSubjects: string[]
  selectedTaskNames: string[]
  setDistrictNames: (value: Components.Schemas.District["name"][]) => void
  setPageSize: (value: string) => void
  setReason: (value: string) => void
  setRole: (value: string) => void
  setSelectedCorporations: (value: Components.Schemas.HousingCorporation["name"][]) => void
  setSelectedSubjects: (value: string[]) => void
  setSelectedTaskNames: (value: Components.Schemas.CaseUserTaskTaskName["name"][]) => void
  setTheme: (value: string) => void
  setOwner: (value: string) => void
  subjects?: Components.Schemas.Subject[]
  taskNames?: Components.Schemas.CaseUserTaskTaskName[]
  theme: string
  themes?: Components.Schemas.CaseTheme[]
}

const TasksFilter: React.FC<Props> = ({
  role, roles, setRole, theme, themes, setTheme, pageSize, setPageSize, owner,
  setOwner, taskNames, selectedTaskNames, setSelectedTaskNames, reasons, reason, setReason,
  districts, districtNames, setDistrictNames, corporations, selectedCorporations,
  setSelectedCorporations, subjects, setSelectedSubjects, selectedSubjects
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
      { reasons === undefined ? <Spinner /> : (
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
      { taskNames === undefined ? <Spinner /> : (
        <MultipleOptionsFilterBox
          label="Taak namen"
          options={ taskNames }
          selectedOptions={ selectedTaskNames }
          setSelectedOptions={ setSelectedTaskNames }
        />
      )}
      { subjects !== undefined && (
        <MultipleOptionsFilterBox
          label="Onderwerpen"
          options={ subjects }
          selectedOptions={ selectedSubjects }
          setSelectedOptions={ setSelectedSubjects }
          byId
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
