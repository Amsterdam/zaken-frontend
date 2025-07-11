import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffoldDate from "./scaffoldDate"
import scaffoldTheme from "./scaffoldTheme"
import scaffoldPageSize from "./scaffoldPageSize"
import scaffoldReason from "./scaffoldReason"
import MultipleOptionsFilterBox from "app/components/filters/MultipleOptionsFilterBox/MultipleOptionsFilterBox"
import scaffoldClosedCases from "./scaffoldClosedCases"
import { useFilterHandler } from "./useFilterHandler"

type Props = {
  date: string
  corporations?: Components.Schemas.HousingCorporation[]
  districts: Components.Schemas.District[]
  districtNames: Components.Schemas.District["name"][]
  openCases: string
  pageSize: string
  projects?: Components.Schemas.CaseProject[]
  reason: string
  reasons?: Components.Schemas.CaseReason[]
  selectedCorporations: string[]
  selectedProjects: string[]
  selectedSubjects: string[]
  selectedTags: string[]
  subjects?: Components.Schemas.Subject[]
  tags?: Components.Schemas.Tag[]
  theme: string
  themes: Components.Schemas.CaseTheme[]
}

const CasesFilter: React.FC<Props> = ({
  corporations,
  date,
  districtNames,
  districts,
  openCases,
  pageSize,
  projects,
  reason,
  reasons,
  selectedCorporations,
  selectedProjects,
  selectedSubjects,
  selectedTags,
  subjects,
  tags,
  theme,
  themes
}) => {
  const { onChangeFilter, onChangePageSize } = useFilterHandler()
  const setDate = (value: string) => onChangeFilter("fromStartDate", value)
  const setDistrictNames = (value: Components.Schemas.District["name"][]) =>
    onChangeFilter("districtNames", value)
  const setOpenCases = (value: string) => onChangeFilter("openCases", value)
  const setPageSize = onChangePageSize
  const setReason = (value: string) => onChangeFilter("reason", value)
  const setSelectedCorporations = (value: string[]) =>
    onChangeFilter("housingCorporations", value)
  const setSelectedProjects = (value: string[]) =>
    onChangeFilter("projects", value)
  const setSelectedSubjects = (value: string[]) =>
    onChangeFilter("subjects", value)
  const setSelectedTags = (value: string[]) => onChangeFilter("tags", value)
  const setTheme = (value: string) => onChangeFilter("theme", value)

  const corporationOptions = [
    ...(corporations || []),
    { id: "housing_corporation_isnull", name: "Zonder corporatie" }
  ]

  const multipleFilters = [
    {
      label: "Corporaties",
      options: corporationOptions,
      selected: selectedCorporations,
      setSelected: setSelectedCorporations,
      byId: true
    },
    {
      label: "Projecten",
      options: projects,
      selected: selectedProjects,
      setSelected: setSelectedProjects,
      byId: true
    },
    {
      label: "Onderwerpen",
      options: subjects,
      selected: selectedSubjects,
      setSelected: setSelectedSubjects,
      byId: true
    },
    {
      label: "Tags",
      options: tags,
      selected: selectedTags,
      setSelected: setSelectedTags,
      byId: true
    },
    {
      label: "Stadsdelen",
      options: districts,
      selected: districtNames,
      setSelected: setDistrictNames,
      byId: false
    }
  ]

  return (
    <FilterMenu>
      <ScaffoldForm>
        <ScaffoldFields {...scaffoldTheme(theme, themes, setTheme)} />
      </ScaffoldForm>
      <ScaffoldForm>
        <ScaffoldFields {...scaffoldDate(date, setDate)} />
      </ScaffoldForm>
      {reasons === undefined ? (
        <Spinner />
      ) : (
        <ScaffoldForm>
          <ScaffoldFields {...scaffoldReason(reason, setReason, reasons)} />
        </ScaffoldForm>
      )}
      {multipleFilters.map(
        ({ label, options, selected, setSelected, byId }) =>
          options !== undefined && (
            <MultipleOptionsFilterBox
              key={label}
              label={label}
              options={options}
              selectedOptions={selected}
              setSelectedOptions={setSelected}
              byId={byId}
            />
          )
      )}
      <ScaffoldForm>
        <ScaffoldFields {...scaffoldPageSize(pageSize, setPageSize)} />
      </ScaffoldForm>
      <ScaffoldForm>
        <ScaffoldFields {...scaffoldClosedCases(openCases, setOpenCases)} />
      </ScaffoldForm>
    </FilterMenu>
  )
}

export default CasesFilter
