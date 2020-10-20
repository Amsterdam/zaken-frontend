import React, { useMemo } from "react"
import DateDisplay from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"

type Props = {
  caseData: Components.Schemas.Case
}

const CaseDetails: React.FC<Props> = ({ caseData }) => {
  const values = useMemo(() => ({
    "Start datum": caseData.start_date ? <DateDisplay date={ caseData.start_date } /> : undefined,
    "Eind datum": caseData.end_date ? <DateDisplay date={ caseData.end_date } /> : undefined,
    "Zaaktype": caseData.case_type.name
  }), [ caseData ])

  return <DefinitionList title="Zaakdetails" values={values} />
}

export default CaseDetails
