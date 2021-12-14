import { useEffect } from "react"

import { Row, Column } from "app/components/layouts/Grid"
import TableCases from "app/components/cases/TableCases/TableCases"
import CasesFilter from "app/components/cases/CasesFilter/CasesFilter"
import { getDate, createOptions } from "app/components/cases/CasesFilter/scaffold"
import { useCases } from "app/state/rest"
import useURLState from "app/hooks/useURLState/useURLState"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"

const parse = (value: string | null) => {
  const options = Object.keys(createOptions())
  return value !== null && options.includes(value) ? value : getDate()[0]
}

const Cases: React.FC = () => {
  const [date, setDate] = useURLState("date", parse, true)
  const [data, { isBusy, execGet }] = useCases(date)
  const [hasPermission] = useHasPermission(SENSITIVE_CASE_PERMISSION)

  useEffect(() => {
    (async () => await execGet())()
  }, [date, execGet])

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
        <CasesFilter date={ date } setDate={ setDate } />
      </Column>
    </Row>
  )
}
export default Cases
