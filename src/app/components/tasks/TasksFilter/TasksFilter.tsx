import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"
import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffoldTheme from "./scaffoldTheme"
import scaffoldRole from "./scaffoldRole"
import scaffoldPageSize from "./scaffoldPageSize"
import scaffoldMyTasks from "./scaffoldMyTasks"
import scaffoldReasons from "./scaffoldReasons"
import MultipleOptionsFilterBox from "app/components/filters/MultipleOptionsFilterBox/MultipleOptionsFilterBox"
import NoCorporationFilter from "app/components/filters/NoCorporationFilter/NoCorporationFilter"

type Props = {
  corporations?: Components.Schemas.HousingCorporation[]
  corporationIsNull: boolean
  districtNames: Components.Schemas.District["name"][]
  districts: Components.Schemas.District[]
  owner: string
  onChangeFilter: (key: string, value: any) => void
  onChangePageSize: (value: string) => void
  pageSize: string
  projects?: Components.Schemas.CaseProject[]
  reason: string
  reasons?: Components.Schemas.CaseReason[]
  role: MockComponents.Schemas.Role
  roles?: MockComponents.Schemas.Role[]
  selectedCorporations: string[]
  selectedProjects: string[]
  selectedSubjects: string[]
  selectedTags: string[]
  selectedTaskNames: string[]
  subjects?: Components.Schemas.Subject[]
  tags?: Components.Schemas.Tag[]
  taskNames?: Components.Schemas.CaseUserTaskTaskName[]
  theme: string
  themes?: Components.Schemas.CaseTheme[]
}

const TasksFilter: React.FC<Props> = ({
  corporations,
  corporationIsNull,
  districtNames,
  districts,
  owner,
  onChangeFilter,
  onChangePageSize,
  pageSize,
  projects,
  reason,
  reasons,
  role,
  roles,
  selectedCorporations,
  selectedProjects,
  selectedSubjects,
  selectedTags,
  selectedTaskNames,
  subjects,
  tags,
  taskNames,
  theme,
  themes
}) => {
  const setDistrictNames = (value: Components.Schemas.District["name"][]) =>
    onChangeFilter("districtNames", value)
  const setOwner = (value: string) => onChangeFilter("owner", value)
  const setReason = (value: string) => onChangeFilter("reason", value)
  const setRole = (value: string) => onChangeFilter("role", value)
  const setSelectedCorporations = (value: string[]) =>
    onChangeFilter("housingCorporations", value)
  const setCorporationIsNull = (value: boolean) =>
    onChangeFilter("housingCorporationIsNull", value)
  const setSelectedProjects = (value: string[]) =>
    onChangeFilter("projects", value)
  const setSelectedSubjects = (value: string[]) =>
    onChangeFilter("subjects", value)
  const setSelectedTags = (value: string[]) => onChangeFilter("tags", value)
  const setSelectedTaskNames = (
    value: Components.Schemas.CaseUserTaskTaskName["name"][]
  ) => onChangeFilter("taskNames", value)
  const setTheme = (value: string) => onChangeFilter("theme", value)

  return (
    <FilterMenu>
      <ScaffoldForm>
        <ScaffoldFields {...scaffoldMyTasks(owner, setOwner)} />
      </ScaffoldForm>
      {themes === undefined ? (
        <Spinner />
      ) : (
        <ScaffoldForm>
          <ScaffoldFields {...scaffoldTheme(theme, themes, setTheme)} />
        </ScaffoldForm>
      )}
      {roles === undefined ? (
        <Spinner />
      ) : (
        <ScaffoldForm>
          <ScaffoldFields {...scaffoldRole(role, roles, setRole)} />
        </ScaffoldForm>
      )}
      {reasons === undefined ? (
        <Spinner />
      ) : (
        <ScaffoldForm>
          <ScaffoldFields {...scaffoldReasons(reason, setReason, reasons)} />
        </ScaffoldForm>
      )}
      {taskNames === undefined ? (
        <Spinner />
      ) : (
        <MultipleOptionsFilterBox
          label="Taak namen"
          options={taskNames}
          selectedOptions={selectedTaskNames}
          setSelectedOptions={setSelectedTaskNames}
        />
      )}
      <MultipleOptionsFilterBox
        label="Corporaties"
        options={corporations}
        selectedOptions={selectedCorporations}
        setSelectedOptions={setSelectedCorporations}
        byId
      />

      <NoCorporationFilter checked={corporationIsNull} setChecked={setCorporationIsNull}/>

      {projects && (
        <MultipleOptionsFilterBox
          label="Projecten"
          options={projects}
          selectedOptions={selectedProjects}
          setSelectedOptions={setSelectedProjects}
          byId
        />
      )}

      {subjects && (
        <MultipleOptionsFilterBox
          label="Onderwerpen"
          options={subjects}
          selectedOptions={selectedSubjects}
          setSelectedOptions={setSelectedSubjects}
          byId
        />
      )}
      {tags && (
        <MultipleOptionsFilterBox
          label="Tags"
          options={tags}
          selectedOptions={selectedTags}
          setSelectedOptions={setSelectedTags}
          byId
        />
      )}
      <MultipleOptionsFilterBox
        label="Stadsdelen"
        options={districts}
        selectedOptions={districtNames}
        setSelectedOptions={setDistrictNames}
      />
      <ScaffoldForm>
        <ScaffoldFields {...scaffoldPageSize(pageSize, onChangePageSize)} />
      </ScaffoldForm>
    </FilterMenu>
  )
}

export default TasksFilter
