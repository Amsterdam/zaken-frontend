import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffoldDate from "./scaffoldDate"
import scaffoldTheme from "./scaffoldTheme"
import scaffoldPageSize from "./scaffoldPageSize"
import scaffoldReason from "./scaffoldReason"
import MultipleOptionsFilterBox from "app/components/filters/MultipleOptionsFilterBox/MultipleOptionsFilterBox"

type Props = {
  date: string
  corporations?: Components.Schemas.HousingCorporation[]
  districts: Components.Schemas.District[]
  districtNames: Components.Schemas.District["name"][]
  pageSize: string
  projects?: Components.Schemas.CaseProject[]
  reason: string
  reasons?: Components.Schemas.CaseReason[]
  selectedCorporations: string[]
  selectedProjects: string[]
  selectedSubjects: string[]
  selectedTags: string[]
  setDate: (value: string) => void
  setDistrictNames: (value: Components.Schemas.District["name"][]) => void
  setPageSize: (value: string) => void
  setReason: (value: string) => void
  setSelectedCorporations: (value: Components.Schemas.HousingCorporation["name"][]) => void
  setSelectedProjects: (value: string[]) => void
  setSelectedSubjects: (value: string[]) => void
  setSelectedTags: (value: string[]) => void
  setTheme: (value: string) => void
  subjects?: Components.Schemas.Subject[]
  tags?: Components.Schemas.Tag[]
  theme: string
  themes: Components.Schemas.CaseTheme[]
}

const CasesFilter: React.FC<Props> = ({
  date, setDate, theme, themes, setTheme, pageSize, setPageSize,
  reasons, reason, setReason, districts, districtNames, setDistrictNames,
  corporations, selectedCorporations, setSelectedCorporations, subjects,
  setSelectedSubjects, selectedSubjects, tags, selectedTags, setSelectedTags,
  projects, selectedProjects, setSelectedProjects
}) => (
  <FilterMenu>
    <ScaffoldForm>
      <ScaffoldFields { ...scaffoldTheme(theme, themes, setTheme) } />
    </ScaffoldForm>
    <ScaffoldForm>
      <ScaffoldFields { ...scaffoldDate(date, setDate) } />
    </ScaffoldForm>
    { reasons === undefined ? <Spinner /> : (
      <ScaffoldForm>
        <ScaffoldFields { ...scaffoldReason(reason, setReason, reasons) } />
      </ScaffoldForm>
    )}
    <MultipleOptionsFilterBox
      label="Corporaties"
      options={ corporations }
      selectedOptions={ selectedCorporations }
      setSelectedOptions={ setSelectedCorporations }
      byId
    />
    { projects !== undefined && (
      <MultipleOptionsFilterBox
        label="Projecten"
        options={ projects }
        selectedOptions={ selectedProjects }
        setSelectedOptions={ setSelectedProjects }
        byId
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
    { subjects !== undefined && (
      <MultipleOptionsFilterBox
        label="Tags"
        options={ tags }
        selectedOptions={ selectedTags }
        setSelectedOptions={ setSelectedTags }
        byId
      />
    )}
    <MultipleOptionsFilterBox
      label="Stadsdelen"
      options={ districts }
      selectedOptions={ districtNames }
      setSelectedOptions={ setDistrictNames }
    />
    <ScaffoldForm>
      <ScaffoldFields { ...scaffoldPageSize(pageSize, setPageSize) } />
    </ScaffoldForm>
  </FilterMenu>
)

export default CasesFilter
