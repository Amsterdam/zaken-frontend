import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffoldDate from "./scaffoldDate"
import scaffoldTheme from "./scaffoldTheme"
import scaffoldPageSize from "./scaffoldPageSize"
import scaffoldReason from "./scaffoldReason"
import MultipleOptionsFilter from "app/components/filters/MultipleOptionsFilter/MultipleOptionsFilter"
import MultipleOptionsFilterBox from "app/components/filters/MultipleOptionsFilterBox/MultipleOptionsFilterBox"

type Props = {
  date: string
  corporations?: Components.Schemas.HousingCorporation[]
  districts: Components.Schemas.District[]
  districtNames: Components.Schemas.District["name"][]
  pageSize: string
  reason: string
  reasons?: Components.Schemas.CaseReason[]
  selectedCorporations: string[]
  selectedSubjects: string[]
  setDate: (value: string) => void
  setDistrictNames: (value: Components.Schemas.District["name"][]) => void
  setPageSize: (value: string) => void
  setReason: (value: string) => void
  setSelectedCorporations: (value: Components.Schemas.HousingCorporation["name"][]) => void
  setSelectedSubjects: (value: string[]) => void
  setTheme: (value: string) => void
  subjects?: Components.Schemas.Subject[]
  theme: string
  themes: Components.Schemas.CaseTheme[]
}

const CasesFilter: React.FC<Props> = ({
  date, setDate, theme, themes, setTheme, pageSize, setPageSize,
  reasons, reason, setReason, districts, districtNames, setDistrictNames,
  corporations, selectedCorporations, setSelectedCorporations, subjects,
  setSelectedSubjects, selectedSubjects
}) => (
  <FilterMenu>
    <ScaffoldForm>
      <ScaffoldFields { ...scaffoldTheme(theme, themes, setTheme) } />
    </ScaffoldForm>
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
        <ScaffoldFields { ...scaffoldReason(reason, setReason, reasons) } />
      </ScaffoldForm>
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
    <ScaffoldForm>
      <ScaffoldFields { ...scaffoldDate(date, setDate) } />
    </ScaffoldForm>
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
)

export default CasesFilter
