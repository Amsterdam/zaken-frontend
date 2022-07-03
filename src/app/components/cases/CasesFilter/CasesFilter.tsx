import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffoldDate from "./scaffoldDate"
import scaffoldTheme from "./scaffoldTheme"
import scaffoldPageSize from "./scaffoldPageSize"
import scaffoldReasons from "./scaffoldReasons"

type Props = {
  date: string
  setDate: (value: string) => void
  theme: string
  themes?: Components.Schemas.CaseTheme[]
  setTheme: (value: string) => void
  pageSize: string
  setPageSize: (value: string) => void
  reasons?: Components.Schemas.CaseReason[]
  reason: string
  setReason: (value: string) => void
}

const CasesFilter: React.FC<Props> = ({
  date, setDate, theme, themes, setTheme, pageSize, setPageSize,
  reasons, reason, setReason
}) => (
  <FilterMenu>
    {themes === undefined
      ? <Spinner />
      : (
        <ScaffoldForm>
          <ScaffoldFields { ...scaffoldTheme(theme, themes, setTheme) } />
        </ScaffoldForm>
      )
    }
    { reasons === undefined ? <Spinner /> : (
      <ScaffoldForm>
        <ScaffoldFields { ...scaffoldReasons(reason, setReason, reasons) } />
      </ScaffoldForm>
      )
    }
    <ScaffoldForm>
      <ScaffoldFields { ...scaffoldDate(date, setDate) } />
    </ScaffoldForm>
    <ScaffoldForm>
      <ScaffoldFields { ...scaffoldPageSize(pageSize, setPageSize) } />
    </ScaffoldForm>
  </FilterMenu>
)

export default CasesFilter
