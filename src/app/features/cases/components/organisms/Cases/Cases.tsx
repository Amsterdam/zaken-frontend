import React, { useEffect } from "react"

import { Row, Column } from "app/features/shared/components/atoms/Grid/"
import TableCases from "app/features/cases/components/organisms/TableCases/TableCases"
import CasesFilter from "app/features/cases/components/organisms/CasesFilter/CasesFilter"
import { getDate, createOptions } from "app/features/cases/components/organisms/CasesFilter/scaffold"
import { useCases } from "app/state/rest"
import useURLState from "app/features/shared/hooks/useURLState/useURLState"
import ButtonMockCases from "./ButtonMockCases"

const Cases: React.FC = () => {
  const parse = (value: string | null) => {
    const options = Object.keys(createOptions())
    return value !== null && options.includes(value) ? value : getDate()[0]
  }
  const [date, setDate] = useURLState("date", parse)
  const { data, isBusy, execGet } = useCases(date)

  useEffect(() => {
    (async () => await execGet())()
  }, [date, execGet])

  return (
    <>
      <Row>
        <Column spanLarge={80}>
          <TableCases data={ data } isBusy={ isBusy } />
        </Column>
        <Column spanLarge={20}>
          <CasesFilter date={ date } setDate={ setDate } />
        </Column>
      </Row>
      { process.env.REACT_APP_ENVIRONMENT !== "production" && <ButtonMockCases /> }
    </>
  )
}
export default Cases
