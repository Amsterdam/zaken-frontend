import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form";
import { Spinner } from "@amsterdam/asc-ui";
import FilterMenu from "app/components/shared/FilterMenu/FilterMenu";
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields";
import scaffoldTheme from "./scaffoldTheme";
import scaffoldRole from "./scaffoldRole";
import scaffoldPageSize from "./scaffoldPageSize";
import scaffoldReasons from "./scaffoldReasons";
import MultipleOptionsFilterBox, {
  type Option,
} from "app/components/filters/MultipleOptionsFilterBox/MultipleOptionsFilterBox";
import NoCorporationFilter from "app/components/filters/NoCorporationFilter/NoCorporationFilter";

type Props = {
  corporations?: Components.Schemas.HousingCorporation[];
  corporationIsNull: boolean;
  districtNames: Components.Schemas.District["name"][];
  districts: Components.Schemas.District[];
  onChangeFilter: (key: string, value: any) => void;
  onChangePageSize: (value: string) => void;
  pageSize: string;
  projects?: Components.Schemas.CaseProject[];
  reason: string;
  reasons?: Components.Schemas.CaseReason[];
  role: MockComponents.Schemas.Role;
  roles?: MockComponents.Schemas.Role[];
  selectedCorporations: string[];
  selectedOwners: string[];
  selectedProjects: string[];
  selectedSubjects: string[];
  selectedTags: string[];
  selectedTaskNames: string[];
  subjects?: Components.Schemas.Subject[];
  tags?: Components.Schemas.Tag[];
  taskNames?: Components.Schemas.CaseUserTaskTaskName[];
  taskOwners?: Option[];
  theme: string;
  themes?: Components.Schemas.CaseTheme[];
};

const TasksFilter: React.FC<Props> = ({
  corporations,
  corporationIsNull,
  districtNames,
  districts,
  onChangeFilter,
  onChangePageSize,
  pageSize,
  projects,
  reason,
  reasons,
  role,
  roles,
  selectedCorporations,
  selectedOwners,
  selectedProjects,
  selectedSubjects,
  selectedTags,
  selectedTaskNames,
  subjects,
  tags,
  taskNames,
  taskOwners,
  theme,
  themes,
}) => {
  const setReason = (value: string) => onChangeFilter("reason", value);
  const setRole = (value: string) => onChangeFilter("role", value);
  const setCorporationIsNull = (value: boolean) =>
    onChangeFilter("housingCorporationIsNull", value);
  const setTheme = (value: string) => onChangeFilter("theme", value);

  
  return (
    <FilterMenu>
      <MultipleOptionsFilterBox
        label="Toegewezen aan"
        options={taskOwners}
        selectedOptions={selectedOwners}
        setSelectedOptions={(value: string[]) =>
          onChangeFilter("owners", value)
        }
        byId
      />
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
          setSelectedOptions={(value: string[]) =>
            onChangeFilter("taskNames", value)
          }
        />
      )}
      <MultipleOptionsFilterBox
        label="Corporaties"
        options={corporations}
        selectedOptions={selectedCorporations}
        setSelectedOptions={(value: string[]) =>
          onChangeFilter("housingCorporations", value)
        }
        byId
      />

      <NoCorporationFilter
        checked={corporationIsNull}
        setChecked={setCorporationIsNull}
      />

      {projects && (
        <MultipleOptionsFilterBox
          label="Projecten"
          options={projects}
          selectedOptions={selectedProjects}
          setSelectedOptions={(value: string[]) =>
            onChangeFilter("projects", value)
          }
          byId
        />
      )}

      {subjects && (
        <MultipleOptionsFilterBox
          label="Onderwerpen"
          options={subjects}
          selectedOptions={selectedSubjects}
          setSelectedOptions={(value: string[]) =>
            onChangeFilter("subjects", value)
          }
          byId
        />
      )}
      {tags && (
        <MultipleOptionsFilterBox
          label="Tags"
          options={tags}
          selectedOptions={selectedTags}
          setSelectedOptions={(value: string[]) =>
            onChangeFilter("tags", value)
          }
          byId
        />
      )}
      <MultipleOptionsFilterBox
        label="Stadsdelen"
        options={districts}
        selectedOptions={districtNames}
        setSelectedOptions={(value: string[]) =>
          onChangeFilter("districtNames", value)
        }
      />
      <ScaffoldForm>
        <ScaffoldFields {...scaffoldPageSize(pageSize, onChangePageSize)} />
      </ScaffoldForm>
    </FilterMenu>
  );
};

export default TasksFilter;
