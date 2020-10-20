import React, { useState, useEffect } from "react"

import { Row, Column } from "app/features/shared/components/atoms/Grid/"
import TableCases from "app/features/cases/components/organisms/TableCases/TableCases"
import CasesFilter from "app/features/cases/components/organisms/CasesFilter/CasesFilter"
import { getDate } from "app/features/cases/components/organisms/CasesFilter/scaffold"

import { useCases } from "app/state/rest"

const Cases: React.FC = () => {
  const [date, setDate] = useState(getDate()[0])
  const { data, isBusy, execGet } = useCases(date)

  useEffect(() => {
    (async () => await execGet())()
  }, [date, execGet])

  return (
    <Row>
      <Column spanLarge={80}>
        <TableCases data={ data } isBusy={ isBusy } />
      </Column>
      <Column spanLarge={20}>
        <CasesFilter date={ date } setDate={ setDate } />
      </Column>
    </Row>
  )
}
export default Cases
