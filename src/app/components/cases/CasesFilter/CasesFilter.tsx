import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffoldDate from "./scaffoldDate"
import scaffoldTheme from "./scaffoldTheme"

type Props = {
  date: string
  setDate: (value: string) => void
  theme: string
  themes?: Components.Schemas.CaseTheme[]
  setTheme: (value: string) => void
}

const CasesFilter: React.FC<Props> = ({ date, setDate, theme, themes, setTheme }) => (
  <FilterMenu>
    {themes === undefined
      ? <Spinner />
      : (
        <ScaffoldForm>
          <ScaffoldFields { ...scaffoldTheme(theme, themes, setTheme) } />
        </ScaffoldForm>
      )
    }
    <ScaffoldForm>
      <ScaffoldFields { ...scaffoldDate(date, setDate) } />
    </ScaffoldForm>
  </FilterMenu>
)

export default CasesFilter
