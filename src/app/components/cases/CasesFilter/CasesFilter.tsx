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

const CasesFilter: React.FC<Props> = ({ date, setDate, theme, themes, setTheme }) => {
  // const apiUrl = getApiUrlTasks()
  // const { clearContextCache } = useContextCache("cases", apiUrl)

  const onChangeTheme = (value: string) => {
    // Clear the Context/cache to prevent showing outdated data.
    // clearContextCache()
    setTheme(value)
  }

  return (
    <FilterMenu>
      <ScaffoldForm>
        <ScaffoldFields { ...scaffoldDate(date, setDate) } />
      </ScaffoldForm>
      { themes === undefined
          ? <Spinner />
          : (
            <ScaffoldForm>
              <ScaffoldFields { ...scaffoldTheme(theme, themes, onChangeTheme) } />
            </ScaffoldForm>
          )
      }
    </FilterMenu>
  )
}

export default CasesFilter
