import { Row, Column } from "app/components/layouts/Grid"
import TableCases from "app/components/cases/TableCases/TableCases"
import CasesFilter from "app/components/cases/CasesFilter/CasesFilter"
import { getDate, createOptions } from "app/components/cases/CasesFilter/scaffoldDate"
import { useCases, useCaseThemes } from "app/state/rest"
import useURLState from "app/hooks/useURLState/useURLState"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"

const EMPTY_TEXT_NO_PERMISSION = "Helaas, u bent niet geautoriseerd om deze zaken te bekijken."
const EMPTY_TEXT = "Er zijn momenteel geen open zaken voor de gekozen filters."
const UNDERMINING = "Ondermijning"

const parse = (value: string | null) => {
  const options = Object.keys(createOptions())
  return value !== null && options.includes(value) ? value : getDate()[0]
}

const Cases: React.FC = () => {
  const [hasPermission] = useHasPermission(SENSITIVE_CASE_PERMISSION)
  const [date, setDate] = useURLState("from_start_date", parse, true)
  const [caseThemes] = useCaseThemes()
  const [theme, setTheme] = useURLState("theme")
  const [data, { isBusy }] = useCases(true, theme, date)

  const themes = caseThemes?.results || []
  const underminingId = themes.find((e) => e.name === UNDERMINING)?.id
  const emptyPlaceholder = hasPermission === false && theme === underminingId?.toString()
    ? EMPTY_TEXT_NO_PERMISSION : EMPTY_TEXT

  return (
    <Row>
      <Column spanLarge={ 72 }>
        <TableCases
          data={ data }
          isBusy={ isBusy }
          emptyPlaceholder={ emptyPlaceholder }
        />
      </Column>
      <Column spanLarge={ 28 }>
        <CasesFilter
          date={ date }
          setDate={ setDate }
          theme={ theme }
          themes={ themes }
          setTheme={ setTheme }
        />
      </Column>
    </Row>
  )
}
export default Cases
