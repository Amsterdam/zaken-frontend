import React, { useMemo } from "react"
import Details from "../../../../shared/components/molecules/Details/Details"

type Props = {
  caseData: API.Case
}

const CaseDetails: React.FC<Props> = ({ caseData }) => {
  const values = useMemo(() => ({
    "Start datum": caseData.start_date,
    "Eind datum": caseData.end_date,
    "Straat": caseData.address.street_name,
    "Huisnummer": caseData.address.number,
    "Verdieping": caseData.address.suffix,
    "Toevoeging": caseData.address.suffix_letter,
    "Postcode": caseData.address.postal_code
  }), [ caseData ])

  return <Details title={caseData.address.full_address} values={values} />
}

export default CaseDetails
