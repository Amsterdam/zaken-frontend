import React, { useEffect } from "react"

import { Row, Column } from "app/components/layouts/Grid"
import TableCases from "app/components/cases/TableCases/TableCases"
import CasesFilter from "app/components/cases/CasesFilter/CasesFilter"
import { getDate, createOptions } from "app/components/cases/CasesFilter/scaffold"
import { useCases } from "app/state/rest"
import useURLState from "app/hooks/useURLState/useURLState"
import ButtonMockCases from "./ButtonMockCases"

const parse = (value: string | null) => {
  const options = Object.keys(createOptions())
  return value !== null && options.includes(value) ? value : getDate()[0]
}

const Cases: React.FC = () => {

  const [date, setDate] = useURLState("date", parse)
  const [data, { isBusy, execGet }] = useCases(date)

  useEffect(() => {
    (async () => await execGet())()
  }, [date, execGet])

  return (
    <>
      <Row>
        <Column spanLarge={ 80 }>
          <TableCases data={ data } isBusy={ isBusy } />
        </Column>
        <Column spanLarge={ 20 }>
          <CasesFilter date={ date } setDate={ setDate } />
        </Column>
      </Row>
      { process.env.REACT_APP_ENVIRONMENT !== "production" &&
        <ButtonMockCases />
      }
    </>
  )
}
export default Cases
