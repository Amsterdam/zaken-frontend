import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffoldDate from "./scaffoldDate"
import scaffoldTheme from "./scaffoldTheme"
import scaffoldPageSize from "./scaffoldPageSize"
import scaffoldReason from "./scaffoldReason"
import DistrictsFilter from "app/components/filters/DistrictsFilter/DistrictsFilter"

type Props = {
  date: string
  setDate: (value: string) => void
  theme: string
  themes: Components.Schemas.CaseTheme[]
  setTheme: (value: string) => void
  pageSize: string
  setPageSize: (value: string) => void
  reasons?: Components.Schemas.CaseReason[]
  reason: string
  setReason: (value: string) => void
  districts: Components.Schemas.District[]
  districtNames: Components.Schemas.District["name"][]
  setDistrictNames: (value: Components.Schemas.District["name"][]) => void
}

const CasesFilter: React.FC<Props> = ({
  date, setDate, theme, themes, setTheme, pageSize, setPageSize,
  reasons, reason, setReason, districts, districtNames, setDistrictNames
}) => (
  <FilterMenu>
    <ScaffoldForm>
      <ScaffoldFields { ...scaffoldTheme(theme, themes, setTheme) } />
    </ScaffoldForm>
    { reasons === undefined ? <Spinner /> : (
      <ScaffoldForm>
        <ScaffoldFields { ...scaffoldReason(reason, setReason, reasons) } />
      </ScaffoldForm>
      )
    }
    <ScaffoldForm>
      <ScaffoldFields { ...scaffoldDate(date, setDate) } />
    </ScaffoldForm>
    <DistrictsFilter
      districtNames={ districtNames }
      districts={ districts }
      setDistrictNames={ setDistrictNames }
    />
    <ScaffoldForm>
      <ScaffoldFields { ...scaffoldPageSize(pageSize, setPageSize) } />
    </ScaffoldForm>
  </FilterMenu>
)

export default CasesFilter
