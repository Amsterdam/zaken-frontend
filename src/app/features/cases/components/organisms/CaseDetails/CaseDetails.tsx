import React, { useMemo } from "react"
import Details from "../../../../shared/components/molecules/Details/Details"

type Props = {
  caseData: API.Case
}

const CaseDetails: React.FC<Props> = ({ caseData }) => {
  const values = useMemo(() => ({
    "Start datum": caseData.start_date,
    "Eind datum": caseData.end_date
  }), [ caseData ])

  return <Details title={caseData.address.full_address} values={values} />
}

export default CaseDetails
