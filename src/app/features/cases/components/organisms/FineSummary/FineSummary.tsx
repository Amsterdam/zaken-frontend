import React, { useMemo } from "react"
import Details from "../../../../shared/components/molecules/Details/Details"

type Props = {
  fine: API.Fine
}

const FineSummary: React.FC<Props> = ({ fine }) => {
  const values = useMemo(() => ({
    "Kenmerk": fine.vorderingnummer,
    "Status": fine.invorderingstatus,
    "Datum": fine.vervaldatum.substr(0, 10)
  }), [ fine ])

  return <Details
    numInitialVisibleRows={3}
    values={values}
  />
}

export default FineSummary
