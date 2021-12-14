import { useEffect } from "react"

import { Row, Column } from "app/components/layouts/Grid"
import TableCases from "app/components/cases/TableCases/TableCases"
import CasesFilter from "app/components/cases/CasesFilter/CasesFilter"
import { getDate, createOptions } from "app/components/cases/CasesFilter/scaffoldDate"
import { useCases, useCaseThemes } from "app/state/rest"
import useURLState from "app/hooks/useURLState/useURLState"

const parse = (value: string | null) => {
  const options = Object.keys(createOptions())
  return value !== null && options.includes(value) ? value : getDate()[0]
}

const Cases: React.FC = () => {

  const [date, setDate] = useURLState("date", parse, true)
  const [caseThemes] = useCaseThemes()
  const [theme, setTheme] = useURLState("theme")
  const [cases, { isBusy, execGet }] = useCases(theme, date)

  useEffect(() => {
    (async () => await execGet())()
  }, [theme, date, execGet])

  return (
    <Row>
      <Column spanLarge={ 72 }>
        <TableCases data={ cases } isBusy={ isBusy } />
      </Column>
      <Column spanLarge={ 28 }>
        <CasesFilter
          date={ date }
          setDate={ setDate }
          theme={ theme }
          themes={ caseThemes?.results }
          setTheme={ setTheme }
        />
      </Column>
    </Row>
  )
}
export default Cases
