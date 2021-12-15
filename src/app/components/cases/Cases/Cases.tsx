import { useEffect } from "react"

import { Row, Column } from "app/components/layouts/Grid"
import TableCases from "app/components/cases/TableCases/TableCases"
import CasesFilter from "app/components/cases/CasesFilter/CasesFilter"
import { getDate, createOptions } from "app/components/cases/CasesFilter/scaffoldDate"
import { useCases, useCaseThemes } from "app/state/rest"
import useURLState from "app/hooks/useURLState/useURLState"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"

const parse = (value: string | null) => {
  const options = Object.keys(createOptions())
  return value !== null && options.includes(value) ? value : getDate()[0]
}

const Cases: React.FC = () => {
  const [date, setDate] = useURLState("from_start_date", parse, true)
  const [caseThemes] = useCaseThemes()
  const [theme, setTheme] = useURLState("theme")
  const [data, { isBusy, execGet }] = useCases(theme, date)
  const [hasPermission] = useHasPermission(SENSITIVE_CASE_PERMISSION)

  useEffect(() => {
    (async () => await execGet())()
  }, [theme, date, execGet])

  // Filter cases for sensitive. TODO: implement filter in BE
  let sensitiveData = undefined
  if (hasPermission) {
    sensitiveData = data
  } else {
    const results = data?.results?.filter(e => e.sensitive === false)
    sensitiveData = {
      results,
      count: results?.length
    }
  }

  return (
    <Row>
      <Column spanLarge={ 72 }>
        <TableCases data={ sensitiveData } isBusy={ isBusy } />
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
